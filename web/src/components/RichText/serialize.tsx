import { ReactElement, Fragment } from 'react'
import escapeHTML from 'escape-html'
import { Text } from 'slate'

type Children = Leaf[]

type Leaf = {
    type: string
    value?: {
        url: string
        alt: string
    }
    children?: Children
    url?: string
    [key: string]: unknown
}

const serialize = (children: Children): ReactElement[] =>
    children.map((node, i) => {
        if (Text.isText(node)) {
            let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />

            if (node.bold) {
                text = <strong key={i}>{text}</strong>
            }

            if (node.code) {
                text = <code key={i}>{text}</code>
            }

            if (node.italic) {
                text = <em key={i}>{text}</em>
            }

            if (node.underline) {
                text = <u key={i}>{text}</u>
            }

            if (node.strikethrough) {
                text = <s key={i}>{text}</s>
            }

            return <Fragment key={i}>{text}</Fragment>
        }

        if (!node) {
            return null
        }

        switch (node.type) {
            case 'h1':
                return (
                    <h1 className='text-4xl mb-2' key={i}>
                        {serialize(node.children)}
                    </h1>
                )
            case 'h2':
                return (
                    <h2 className='text-2xl font-bold' key={i}>
                        {serialize(node.children)}
                    </h2>
                )
            case 'h3':
                return (
                    <h3 className='text-xl font-bold' key={i}>
                        {serialize(node.children)}
                    </h3>
                )
            case 'h4':
                return (
                    <h4 className='text-lg font-bold' key={i}>
                        {serialize(node.children)}
                    </h4>
                )
            case 'h5':
                return (
                    <h5 className='font-bold' key={i}>
                        {serialize(node.children)}
                    </h5>
                )
            case 'h6':
                return (
                    <h6 className='text-sm uppercase font-bold' key={i}>
                        {serialize(node.children)}
                    </h6>
                )
            case 'quote':
                return <blockquote key={i}>{serialize(node.children)}</blockquote>
            case 'ul':
                return (
                    <ul className='mb-8 list-inside list-disc ps-10' key={i}>
                        {serialize(node.children)}
                    </ul>
                )
            case 'ol':
                return (
                    <ol className='mb-8 list-inside list-decimal ps-10' key={i}>
                        {serialize(node.children)}
                    </ol>
                )
            case 'li':
                return <li key={i}>{serialize(node.children)}</li>
            case 'link':
                return (
                    <a className='text-alt-dark font-bold' href={escapeHTML(node.url)} key={i}>
                        {serialize(node.children)}
                    </a>
                )
            case 'code':
                return (
                    <code key={i}>
                        <pre>{serialize(node.children)}</pre>
                    </code>
                )
            default:
                return (
                    <p className='mb-8' key={i}>
                        {serialize(node.children)}
                    </p>
                )
        }
    })

export default serialize
