import { CollectionConfig } from 'payload/types'
import { adminCollectionAccess, adminFieldAccess } from '../utilities/access'

export const Users: CollectionConfig = {
    slug: 'users',
    auth: true,
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['email', 'name', 'createdAt', 'role'],
        listSearchableFields: ['email', 'role'],
        hidden: ({ user }) => user.role !== 'admin',
    },
    access: {
        read: () => true,
        create: adminCollectionAccess,
        delete: adminCollectionAccess,
    },
    fields: [
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            filterOptions: {
                mimeType: { contains: 'image' },
            },
        },
        {
            name: 'name',
            type: 'text',
            saveToJWT: true,
        },
        {
            name: 'role',
            type: 'select',
            options: [
                { label: 'Admin', value: 'admin' },
                { label: 'User', value: 'user' },
            ],
            required: true,
            defaultValue: 'user',
            saveToJWT: true,
            access: {
                update: adminFieldAccess,
            },
        },
    ],
}

export default Users
