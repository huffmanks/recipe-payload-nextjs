import { formatDurationToISO } from './formatDurationToISO'
import { CollectionBeforeValidateHook } from 'payload/types'

interface NutritionValues {
    quantity: string
    unit: string
}

export const generateRecipeSchema: CollectionBeforeValidateHook = async ({ data, operation }) => {
    if (operation === 'create') return data

    const { prepTimeISO, cookTimeISO, totalTimeISO } = formatDurationToISO(data?.prepTime, data?.cookTime)

    const nutritionData = {
        nutrition: {
            '@type': 'NutritionInformation',
        },
    }

    Object.entries(data?.nutrition).forEach(([key, value]: [key: string, value: NutritionValues]) => {
        nutritionData.nutrition[key] = `${value.quantity} ${value.unit}`
    })

    const hasHeadingFour = data?.instructions?.some((el) => el?.type === 'h4')
    let parentCount = 0
    let parentInitialized = false

    const recipeSchema = {
        '@context': 'https://schema.org/',
        '@type': 'Recipe',
        headline: data?.title,
        name: data?.title,
        datePublished: data?.datePublished,
        dateModified: data?.updatedAt,
        description: data?.description,
        author: {
            '@type': 'Person',
            name: data?.author?.name,
        },
        image: {
            '@type': 'ImageObject',
            url: data?.image?.sizes?.hero?.url,
            width: 900,
            height: 600,
        },
        recipeCuisine: data?.cuisines?.map((cuisine) => cuisine.name),
        recipeCategory: data?.categories?.map((category) => category.name),
        keywords: data?.keywords,
        prepTime: prepTimeISO,
        cookTime: cookTimeISO,
        totalTime: totalTimeISO,
        recipeYield: [data?.servings?.quantity, data?.servings?.yield],
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: data?.rating,
        },
        nutritionData,
        recipeIngredient: data?.ingredients?.map((ingredient) => {
            return ingredient?.sentence
        }),
        recipeInstructions: data?.instructions?.reduce((arr, instruction) => {
            if (hasHeadingFour) {
                if (instruction?.type === 'h3') {
                    if (parentInitialized) {
                        parentCount++
                    } else {
                        parentInitialized = true
                    }
                    arr.push({ '@type': 'HowToSection', name: instruction.children[0].text, itemListElement: [] })
                } else if (instruction?.type === 'h4') {
                    arr[parentCount].itemListElement.push({ '@type': 'HowToStep', name: instruction.children[0].text })
                } else {
                    const lastIndex = arr[parentCount].itemListElement.length - 1
                    const lastInstruction = arr[parentCount].itemListElement[lastIndex]
                    if (lastInstruction.hasOwnProperty('text')) {
                        lastInstruction.text += ' ' + instruction.children[0].text
                    } else {
                        lastInstruction.text = instruction.children[0].text
                    }
                }
            } else {
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
            }

            return arr
        }, []),
    }

    data.recipeSchema = JSON.stringify(recipeSchema)
}
