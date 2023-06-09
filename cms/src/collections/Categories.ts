import { CollectionConfig } from 'payload/types'

const Categories: CollectionConfig = {
    slug: 'categories',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            unique: true,
        },
    ],
}

export default Categories
