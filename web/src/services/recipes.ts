export const getRecipes = async () => {
    const data = await fetch('http://localhost:3001/api/recipes')
    const recipes = await data.json()

    return recipes.docs
}

export const getRecipeBySlug = async (slug: string) => {
    const data = await fetch(`http://localhost:3001/api/recipes/?where[slug][equals]=${slug}`)
    const recipe = await data.json()

    return recipe.docs[0]
}
