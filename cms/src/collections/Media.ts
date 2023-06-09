import path from 'path'
import payload from 'payload'
import type { CollectionBeforeOperationHook, CollectionConfig } from 'payload/types'

import { toKebabCase } from '../utilities/toKebabCase'

const beforeOperationHook: CollectionBeforeOperationHook = async ({ args, operation }) => {
    if (operation !== 'delete') {
        const files = args.req?.files
        if (files && files.file && files.file.name) {
            const tmp = files.file.name.split('.')[0]
            files.file.name = toKebabCase(tmp)
        }
    }
    return args
}

const Media: CollectionConfig = {
    slug: 'media',
    admin: {
        defaultColumns: ['filename', 'alt', 'mimeType', 'uploadedBy'],
        listSearchableFields: ['alt', 'mimeType', 'uploadedBy'],
    },
    access: {
        read: () => true,
    },
    hooks: {
        beforeOperation: [beforeOperationHook],
    },
    upload: {
        staticURL: '/media',
        staticDir: path.resolve(__dirname, '../../media'),
        adminThumbnail: 'thumbnail',
        resizeOptions: {
            width: 1200,
            height: 630,
            position: 'entropy',
        },
        formatOptions: {
            format: 'jpg',
            options: {
                quality: 100,
            },
        },
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 400,
                position: 'entropy',
                formatOptions: {
                    format: 'jpg',
                    options: {
                        quality: 100,
                    },
                },
            },
            {
                name: 'hero',
                width: 900,
                height: 600,
                position: 'entropy',
                formatOptions: {
                    format: 'jpg',
                    options: {
                        quality: 100,
                    },
                },
            },
        ],
    },
    fields: [
        {
            name: 'alt',
            label: 'Alt Text',
            type: 'text',
            localized: true,
            required: true,
        },
        {
            name: 'uploadedBy',
            type: 'relationship',
            relationTo: 'users',
            defaultValue: ({ user }) => user.id,
            admin: {
                position: 'sidebar',
            },
        },
    ],
}

export default Media
