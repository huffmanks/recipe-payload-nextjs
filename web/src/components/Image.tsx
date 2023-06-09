import NextImage from 'next/image'

type Props = {
    src: string
    alt: string
    type?: string
    className?: string
}

const Image = ({ src, alt, type, className }: Props) => {
    if (!src) return null

    const width = type === 'thumbnail' ? 400 : 1200
    const height = type === 'thumbnail' ? 400 : 630

    return (
        <>
            <NextImage className={`object-cover ${className}`} src={src} alt={alt} width={width} height={height} priority />
        </>
    )
}

export default Image
