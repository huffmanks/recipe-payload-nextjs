import serialize from './serialize'

type Props = {
    className?: string
    content: any
}

const RichText = ({ className, content }: Props) => {
    if (!content) {
        return null
    }

    return <div className={className}>{serialize(content)}</div>
}

export default RichText
