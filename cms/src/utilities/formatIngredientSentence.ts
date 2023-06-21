import { CollectionBeforeValidateHook } from 'payload/types'

interface Ingredients {
    sentence?: string
    quantity?: string
    unit?: string
    name?: string
    comment?: string
    isLabel?: boolean
    id?: string
}

function deepEqual(x: any, y: any) {
    const ok = Object.keys,
        tx = typeof x,
        ty = typeof y
    return x && y && tx === 'object' && tx === ty ? ok(x).length === ok(y).length && ok(x).every((key) => deepEqual(x[key], y[key])) : x === y
}

export const formatIngredientSentence: CollectionBeforeValidateHook = ({ data, operation, originalDoc }) => {
    if (operation === 'create') {
        data.ingredients.map((ing: Ingredients) => {
            if (ing.isLabel) {
                ing.sentence = ing.comment
            } else {
                if (!ing.comment) {
                    ing.sentence = `${ing?.quantity} ${ing?.unit} ${ing?.name}`
                } else {
                    ing.sentence = `${ing?.quantity} ${ing?.unit} ${ing?.name}, ${ing.comment}`
                }
            }
        })
    }

    if (operation === 'update') {
        const isCurrentAndOriginalIngredientsTheSame = deepEqual(data.ingredients, originalDoc.ingredients)
        if (isCurrentAndOriginalIngredientsTheSame) return
        data.ingredients.map((ing: Ingredients) => {
            if (ing.isLabel) {
                ing.sentence = ing.comment
            } else {
                if (!ing.comment) {
                    ing.sentence = `${ing?.quantity} ${ing?.unit} ${ing?.name}`
                } else {
                    ing.sentence = `${ing?.quantity} ${ing?.unit} ${ing?.name}, ${ing.comment}`
                }
            }
        })
    }
}
