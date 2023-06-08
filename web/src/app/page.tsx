import Link from 'next/link'

const Home = async () => {
    return (
        <>
            <h1>Home</h1>
            <Link href='/recipes'>Recipes</Link>
        </>
    )
}

export default Home
