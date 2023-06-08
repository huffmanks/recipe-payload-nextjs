import { buildConfig } from 'payload/config'
import path from 'path'
import dotenv from 'dotenv'

import Categories from './collections/Categories'
import Cuisines from './collections/Cuisines'
import Media from './collections/Media'
import Recipes from './collections/Recipes'
import Users from './collections/Users'

import { ProfileImage, LogoutLink } from './components/BottomNavLinks'

dotenv.config()

export default buildConfig({
    serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
    admin: {
        user: Users.slug,
        avatar: ProfileImage,
        components: {
            logout: {
                Button: LogoutLink,
            },
        },
    },
    collections: [Categories, Cuisines, Media, Recipes, Users],
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
    graphQL: {
        schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
    },
})
