import { CollectionConfig } from 'payload/types'

const Cuisines: CollectionConfig = {
    slug: 'cuisines',
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

export default Cuisines
