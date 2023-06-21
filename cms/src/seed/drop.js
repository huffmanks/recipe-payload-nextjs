const payload = require('payload')
const { reset, underscore, cyan, red } = require('./config')

require('dotenv').config()

const { PAYLOAD_SECRET, MONGODB_URI } = process.env

const dropDB = async () => {
    await payload.init({
        secret: PAYLOAD_SECRET,
        mongoURL: MONGODB_URI,
        local: true,
    })

    const deletedImages = await payload.delete({
        collection: 'media',
        where: {
            id: { exists: true },
        },
    })

    const deletedCategories = await payload.delete({
        collection: 'categories',
        where: {
            id: { exists: true },
        },
    })

    const deletedCuisines = await payload.delete({
        collection: 'cuisines',
        where: {
            id: { exists: true },
        },
    })

    const deletedRecipes = await payload.delete({
        collection: 'recipes',
        where: {
            id: { exists: true },
        },
    })

    console.log(`
    ${red}Images deleted:${reset} ${cyan}${underscore}${deletedImages.docs.length * 2}${reset}
    ${red}Categories deleted:${reset} ${cyan}${underscore}${deletedCategories.docs.length}${reset}
    ${red}Cuisines deleted:${reset} ${cyan}${underscore}${deletedCuisines.docs.length}${reset}
    ${red}Recipes deleted:${reset} ${cyan}${underscore}${deletedRecipes.docs.length}${reset}\n
    💣  ${red}Drop completed!${reset}
    `)

    process.exit(0)
}

dropDB()
