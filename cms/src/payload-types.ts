/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
    collections: {
        categories: Category
        cuisines: Cuisine
        media: Media
        recipes: Recipe
        users: User
    }
    globals: {}
}
export interface Category {
    id: string
    name?: string
    recipes?: Recipe[]
    updatedAt: string
    createdAt: string
}
export interface Cuisine {
    id: string
    name?: string
    recipes?: Recipe[]
    updatedAt: string
    createdAt: string
}
export interface Media {
    id: string
    alt: string
    uploadedBy?: string | User
    updatedAt: string
    createdAt: string
    url?: string
    filename?: string
    mimeType?: string
    filesize?: number
    width?: number
    height?: number
    sizes?: {
        thumbnail?: {
            url?: string
            width?: number
            height?: number
            mimeType?: string
            filesize?: number
            filename?: string
        }
        portrait?: {
            url?: string
            width?: number
            height?: number
            mimeType?: string
            filesize?: number
            filename?: string
        }
    }
}
export interface User {
    id: string
    image?: Media
    name?: string
    role: 'admin' | 'user'
    updatedAt: string
    createdAt: string
    email?: string
    resetPasswordToken?: string
    resetPasswordExpiration?: string
    loginAttempts?: number
    lockUntil?: string
    password?: string
}
export interface Recipe {
    id: string
    title: string
    image?: Media
    description?: string
    rating?: number
    servings?: {
        amount?: string
    }
    prepTime?: {
        hours?: string
        minutes?: string
    }
    cookTime?: {
        hours?: string
        minutes?: string
    }
    cuisine?: Cuisine
    categories?: string[] | Category[]
    keywords?: string
    ingredients?: {
        amount?: string
        unit?: string
        item?: string
        id?: string
    }[]
    instructions?: {
        [k: string]: unknown
    }[]
    recipeSchema?:
        | {
              [k: string]: unknown
          }
        | unknown[]
        | string
        | number
        | boolean
        | null
    slug?: string
    author?: User
    datePublished?: string
    updatedAt: string
    createdAt: string
    _status?: 'draft' | 'published'
}
