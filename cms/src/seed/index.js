const payload = require('payload')
const path = require('path')
// const { input, password } = require('@inquirer/prompts')

const { images, categories, cuisines, reset, underscore, cyan, green } = require('./config')
const recipeData = require('./recipeData.json')

require('dotenv').config()

const { PAYLOAD_SECRET, MONGODB_URI } = process.env

const seedDB = async () => {
    await payload.init({
        secret: PAYLOAD_SECRET,
        mongoURL: MONGODB_URI,
        local: true,
    })

    // const answers = {
    //     name: await input({ message: 'Enter your name:' }),
    //     email: await input({ message: 'Enter your email:' }),
    //     pass: await password({ message: 'Enter a password:', mask: '*' }),
    // }

    // const createdUser = await payload.create({
    //     collection: 'users',
    //     data: {
    //         name: answers.name,
    //         role: 'admin',
    //         email: answers.email,
    //         password: answers.pass
    //     },
    // })

    const user = await payload.find({
        collection: 'users',
        where: {
            role: {
                equals: 'admin',
            },
        },
    })

    const userId = user.docs[0].id

    const createdImages = await Promise.all(
        images.map(async (image) => {
            const tmp = image.slice(0, -4)
            const alt = tmp
                .split('-')
                .join(' ')
                .replace(/\w\S*/g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
                })

            const createdImage = await payload.create({
                collection: 'media',
                filePath: path.resolve(__dirname + '/images/', image),
                data: {
                    alt,
                    uploadedBy: userId,
                },
            })

            return createdImage
        })
    )

    const createdCategories = await Promise.all(
        categories.map(async (category) => {
            const createdCategory = await payload.create({
                collection: 'categories',
                data: category,
            })
            return createdCategory
        })
    )

    const createdCuisines = await Promise.all(
        cuisines.map(async (cuisine) => {
            const createdCuisine = await payload.create({
                collection: 'cuisines',
                data: cuisine,
            })
            return createdCuisine
        })
    )

    const createdRecipes = await Promise.all(
        recipeData.map(async (recipe) => {
            const imageId = createdImages
                .filter((img) => img.filename.split('.')[0] === recipe.slug)
                .map((img) => img.id)
                .toString()
            // const imageId = createdImages
            //     .filter((img) => img.alt === recipe.slug)
            //     .map((img) => img.id)
            //     .toString()

            const categoryIds = createdCategories.filter((item) => recipe.categories.includes(item.name)).map((item) => item.id)

            const cuisineId = createdCuisines
                .filter((item) => item.name === recipe.cuisine)
                .map((item) => item.id)
                .toString()

            const createdRecipe = await payload.create({
                collection: 'recipes',
                data: {
                    ...recipe,
                    image: imageId,
                    categories: categoryIds,
                    cuisine: cuisineId,
                    author: userId,
                },
            })
            return createdRecipe
        })
    )

    console.log(`
    ${green}Images created:${reset} ${cyan}${underscore}${createdImages.length * 2}${reset}
    ${green}Categories created:${reset} ${cyan}${underscore}${createdCategories.length}${reset}
    ${green}Cuisines created:${reset} ${cyan}${underscore}${createdCuisines.length}${reset}
    ${green}Recipes created:${reset} ${cyan}${underscore}${createdRecipes.length}${reset}\n
    🌱  ${green}Seed completed!${reset}
    `)

    process.exit(0)
}

seedDB()
