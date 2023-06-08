import { PropsWithChildren } from 'react'
import payload from 'payload'
import dotenv from 'dotenv'
import { CollectionAfterDeleteHook, CollectionBeforeChangeHook, CollectionConfig } from 'payload/types'
import { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types'

import DurationPicker from '../components/DurationPicker/config'
import { formatSlug } from '../utilities/formatSlug'
import { generateRecipeSchema } from '../utilities/generateRecipeSchema'
import Rating from '../components/InputRange/config'

dotenv.config()

const beforeChangeHook: CollectionBeforeChangeHook = async ({ data, originalDoc }) => {
    if (originalDoc) {
        const recipeSchema = await generateRecipeSchema(originalDoc.id)
        const modifiedData = {
            ...data,
            recipeSchema: JSON.stringify(recipeSchema),
        }

        return modifiedData
    } else {
        return data
    }
}

const afterDeleteHook: CollectionAfterDeleteHook = async ({ doc }) => {
    await payload.delete({
        collection: 'media',
        id: doc.image.id,
    })

    return doc
}

const Recipes: CollectionConfig = {
    slug: 'recipes',
    admin: {
        defaultColumns: ['title', 'author', 'cuisine', 'categories', '_status'],
        listSearchableFields: ['author', 'description', 'rating', 'cuisine', 'categories', '_status'],
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
        beforeValidate: [formatSlug],
        beforeChange: [beforeChangeHook],
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
            maxDepth: 3,
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
                            name: 'cuisine',
                            type: 'relationship',
                            relationTo: 'cuisines',
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
                                    name: 'amount',
                                    type: 'text',
                                },
                                {
                                    name: 'unit',
                                    type: 'text',
                                },
                                {
                                    name: 'item',
                                    type: 'text',
                                },
                            ],
                            admin: {
                                initCollapsed: true,
                                components: {
                                    RowLabel: ({ data, index }: PropsWithChildren<RowLabelArgs>) => {
                                        Object.keys(data).forEach((key) => data[key] === undefined && delete data[key])
                                        const formattedString = data?.unit ? `${data?.amount} ${data?.unit} ${data?.item}` : `${data?.amount} ${data?.item}`

                                        return data?.item ? formattedString : `Ingredient ${String(index).padStart(2, '0')}`
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
