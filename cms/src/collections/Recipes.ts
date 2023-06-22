import { PropsWithChildren } from 'react'
import payload from 'payload'
import dotenv from 'dotenv'
import { CollectionAfterDeleteHook, CollectionConfig } from 'payload/types'
import { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types'

import DurationPicker from '../components/DurationPicker/config'
import { formatSlug } from '../utilities/formatSlug'
import { generateRecipeSchema } from '../utilities/generateRecipeSchema'
import Rating from '../components/InputRange/config'
import { formatIngredientSentence } from '../utilities/formatIngredientSentence'

dotenv.config()

const afterDeleteHook: CollectionAfterDeleteHook = async ({ doc }) => {
    if (doc?.image?.id) {
        await payload.delete({
            collection: 'media',
            id: doc.image.id,
        })
    }

    return doc
}

const Recipes: CollectionConfig = {
    slug: 'recipes',
    admin: {
        defaultColumns: ['title', 'cuisines', 'categories', '_status'],
        listSearchableFields: ['author', 'description', 'rating', 'cuisines', 'categories', '_status'],
        useAsTitle: 'title',
        preview: (doc) => {
            if (doc?.slug && doc._status === 'published') {
                return `${process.env.PAYLOAD_PUBLIC_WEB_URL}/recipes/${doc.slug}`
            }

            return null
        },
    },
    access: {
        read: ({ req }) => {
            if (req.user) return true
            return {
                or: [
                    {
                        _status: {
                            equals: 'published',
                        },
                    },
                    {
                        _status: {
                            exists: false,
                        },
                    },
                ],
            }
        },
    },
    versions: {
        drafts: true,
    },
    hooks: {
        beforeValidate: [formatSlug, formatIngredientSentence, generateRecipeSchema],
        afterDelete: [afterDeleteHook],
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            filterOptions: {
                mimeType: { contains: 'image' },
            },
        },
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Meta',
                    fields: [
                        {
                            name: 'description',
                            type: 'text',
                        },
                        Rating,
                        DurationPicker,
                        {
                            name: 'cuisines',
                            type: 'relationship',
                            relationTo: 'cuisines',
                            hasMany: true,
                        },
                        {
                            name: 'categories',
                            type: 'relationship',
                            relationTo: 'categories',
                            hasMany: true,
                        },
                        {
                            name: 'keywords',
                            type: 'text',
                            label: 'Keywords (healthy, chocolate, etc.)',
                        },
                    ],
                },
                {
                    label: 'Nutrition',
                    description: 'Insert any nutrition information for the recipe.',
                    fields: [
                        {
                            name: 'nutrition',
                            type: 'group',
                            fields: [
                                {
                                    name: 'calories',
                                    type: 'group',
                                    fields: [
                                        {
                                            type: 'row',
                                            fields: [
                                                {
                                                    name: 'quantity',
                                                    type: 'text',
                                                    admin: {
                                                        width: '40%',
                                                    },
                                                },
                                                {
                                                    name: 'unit',
                                                    type: 'text',
                                                    admin: {
                                                        width: '40%',
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    name: 'carbohydrateContent',
                                    type: 'group',
                                    fields: [
                                        {
                                            type: 'row',
                                            fields: [
                                                {
                                                    name: 'quantity',
                                                    type: 'text',
                                                    admin: {
                                                        width: '40%',
                                                    },
                                                },
                                                {
                                                    name: 'unit',
                                                    type: 'text',
                                                    admin: {
                                                        width: '40%',
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    name: 'cholesterolContent',
                                    type: 'group',
                                    fields: [
                                        {
                                            type: 'row',
                                            fields: [
                                                {
                                                    name: 'quantity',
                                                    type: 'text',
                                                    admin: {
                                                        width: '40%',
                                                    },
                                                },
                                                {
                                                    name: 'unit',
                                                    type: 'text',
                                                    admin: {
                                                        width: '40%',
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    name: 'fiberContent',
                                    type: 'group',
                                    fields: [
                                        {
                                            type: 'row',
                                            fields: [
                                                {
                                                    name: 'quantity',
                                                    type: 'text',
                                                    admin: {
                                                        width: '40%',
                                                    },
                                                },
                                                {
                                                    name: 'unit',
                                                    type: 'text',
                                                    admin: {
                                                        width: '40%',
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    name: 'proteinContent',
                                    type: 'group',
                                    fields: [
                                        {
                                            type: 'row',
                                            fields: [
                                                {
                                                    name: 'quantity',
                                                    type: 'text',
                                                    admin: {
                                                        width: '40%',
                                                    },
                                                },
                                                {
                                                    name: 'unit',
                                                    type: 'text',
                                                    admin: {
                                                        width: '40%',
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    name: 'saturatedFatContent',
                                    type: 'group',
                                    fields: [
                                        {
                                            type: 'row',
                                            fields: [
                                                {
                                                    name: 'quantity',
                                                    type: 'text',
                                                    admin: {
                                                        width: '40%',
                                                    },
                                                },
                                                {
                                                    name: 'unit',
                                                    type: 'text',
                                                    admin: {
                                                        width: '40%',
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    name: 'sodiumContent',
                                    type: 'group',
                                    fields: [
                                        {
                                            type: 'row',
                                            fields: [
                                                {
                                                    name: 'quantity',
                                                    type: 'text',
                                                    admin: {
                                                        width: '40%',
                                                    },
                                                },
                                                {
                                                    name: 'unit',
                                                    type: 'text',
                                                    admin: {
                                                        width: '40%',
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    name: 'sugarContent',
                                    type: 'group',
                                    fields: [
                                        {
                                            type: 'row',
                                            fields: [
                                                {
                                                    name: 'quantity',
                                                    type: 'text',
                                                    admin: {
                                                        width: '40%',
                                                    },
                                                },
                                                {
                                                    name: 'unit',
                                                    type: 'text',
                                                    admin: {
                                                        width: '40%',
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    name: 'fatContent',
                                    type: 'group',
                                    fields: [
                                        {
                                            type: 'row',
                                            fields: [
                                                {
                                                    name: 'quantity',
                                                    type: 'text',
                                                    admin: {
                                                        width: '40%',
                                                    },
                                                },
                                                {
                                                    name: 'unit',
                                                    type: 'text',
                                                    admin: {
                                                        width: '40%',
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    name: 'unsaturatedFatContent',
                                    type: 'group',
                                    fields: [
                                        {
                                            type: 'row',
                                            fields: [
                                                {
                                                    name: 'quantity',
                                                    type: 'text',
                                                    admin: {
                                                        width: '40%',
                                                    },
                                                },
                                                {
                                                    name: 'unit',
                                                    type: 'text',
                                                    admin: {
                                                        width: '40%',
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Ingredients',
                    description: 'Insert the ingredients for the recipe.',
                    fields: [
                        {
                            name: 'ingredients',
                            type: 'array',
                            labels: {
                                singular: 'Ingredient',
                                plural: 'Ingredients',
                            },
                            fields: [
                                {
                                    name: 'isLabel',
                                    type: 'checkbox',
                                },
                                {
                                    name: 'sentence',
                                    type: 'text',
                                    admin: {
                                        readOnly: true,
                                    },
                                },
                                {
                                    name: 'quantity',
                                    type: 'text',
                                    admin: {
                                        condition: (data, siblingData) => {
                                            if (siblingData.isLabel) {
                                                return false
                                            } else {
                                                return true
                                            }
                                        },
                                    },
                                },
                                {
                                    name: 'unit',
                                    type: 'text',
                                    admin: {
                                        condition: (data, siblingData) => {
                                            if (siblingData.isLabel) {
                                                return false
                                            } else {
                                                return true
                                            }
                                        },
                                    },
                                },
                                {
                                    name: 'name',
                                    type: 'text',
                                    admin: {
                                        condition: (data, siblingData) => {
                                            if (siblingData.isLabel) {
                                                return false
                                            } else {
                                                return true
                                            }
                                        },
                                    },
                                },
                                {
                                    name: 'comment',
                                    type: 'text',
                                },
                            ],
                            admin: {
                                initCollapsed: true,
                                components: {
                                    RowLabel: ({ data, index }: PropsWithChildren<RowLabelArgs>) => {
                                        return data?.sentence ? data.sentence : `Ingredient ${String(index).padStart(2, '0')}`
                                    },
                                },
                            },
                        },
                    ],
                },
                {
                    label: 'Instructions',
                    description: 'Enter the instructions for the recipe.',
                    fields: [
                        {
                            name: 'instructions',
                            type: 'richText',
                        },
                    ],
                },
            ],
        },
        {
            name: 'recipeSchema',
            type: 'json',
            admin: {
                disabled: true,
            },
        },
        {
            name: 'slug',
            label: 'Recipe Slug',
            type: 'text',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'users',
            defaultValue: ({ user }) => user.id,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'datePublished',
            type: 'date',
            admin: {
                position: 'sidebar',
            },
        },
    ],
}

export default Recipes
