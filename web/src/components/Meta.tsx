import NextHead from 'next/head'
import getConfig from 'next/config'
import { useRouter } from 'next/router'

const {
    publicRuntimeConfig: { SERVER_URL },
} = getConfig()

const defaultDescription = 'Create your own list of recipes.'
const defaultTitle = 'Recipes'
const defaultOGImage = `${SERVER_URL}/images/og-image.jpg`
const defaultKeywords = 'Recipe, meals'

type Props = {
    title?: string
    description?: string
    ogImage?: string
    keywords?: string
}

const Meta = ({ title, description, ogImage, keywords }: Props) => {
    const { asPath } = useRouter()

    const tags = keywords || defaultKeywords

    return (
        <NextHead>
            <title>{title || defaultTitle}</title>
            <link rel='icon' type='image/x-icon' href='/favicon.svg' />
            <meta name='description' content={description || defaultDescription} />
            <meta name='keywords' content={tags} />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta property='og:url' content={`${SERVER_URL}${asPath}`} />
            <meta property='og:title' content={title || defaultTitle} />
            <meta property='og:description' content={description || defaultDescription} />
            <meta property='twitter:title' content={title || defaultTitle} />
            <meta name='twitter:site' content='@recipes' />
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:image' content={ogImage || defaultOGImage} />
            <meta property='og:image' content={ogImage || defaultOGImage} />
        </NextHead>
    )
}

export default Meta
