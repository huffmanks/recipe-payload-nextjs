import payload from 'payload'
import { formatDurationToISO } from './formatDurationToISO'

export const generateRecipeSchema = async (id: string) => {
    const recipe = await payload.find({
        collection: 'recipes',
        where: {
            id: {
                equals: id,
            },
        },
    })

    const data = recipe.docs[0]

    const { prepTimeISO, cookTimeISO, totalTimeISO } = formatDurationToISO(data?.prepTime, data?.cookTime)

    const obj = {
        '@context': 'https://schema.org/',
        '@type': 'Recipe',
        name: data?.title,
        image: [data?.image?.url, data?.image?.sizes?.thumbnail?.url],
        author: {
            '@type': 'Person',
            name: data?.author?.name,
        },
        datePublished: data?.datePublished?.split('T')?.[0] || new Date().toString().split('T')[0],
        description: data?.description,
        recipeCuisine: data?.cuisine?.name,
        prepTime: prepTimeISO,
        cookTime: cookTimeISO,
        totalTime: totalTimeISO,
        keywords: data?.keywords,
        recipeYield: data?.servings?.amount,
        recipeCategory: data?.categories?.map((category) => category.name),
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: data?.rating,
        },
        recipeIngredient: data?.ingredients?.map((ingredient) => {
            return !ingredient?.unit ? `${ingredient.amount} ${ingredient.item}` : `${ingredient.amount} ${ingredient.unit} ${ingredient.item}`
        }),
        recipeInstructions: data?.instructions?.reduce((arr, instruction) => {
            if (instruction?.type === 'h3') {
                arr.push({ '@type': 'HowToStep', name: instruction.children[0].text })
            } else {
                const lastIndex = arr.length - 1
                const lastInstruction = arr[lastIndex]
                if (lastInstruction.hasOwnProperty('text')) {
                    lastInstruction.text += ' ' + instruction.children[0].text
                } else {
                    lastInstruction.text = instruction.children[0].text
                }
            }
            return arr
        }, []),
    }
    return obj
}
