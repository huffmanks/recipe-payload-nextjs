import { CollectionBeforeValidateHook } from 'payload/types'
import { toKebabCase } from './toKebabCase'

export const formatSlug: CollectionBeforeValidateHook = ({ data, operation, originalDoc }) => {
    if (operation === 'create') {
        data.slug = toKebabCase(data.title)
    }

    if (operation === 'update') {
        if (data.title === originalDoc.title) return
        data.slug = toKebabCase(data.title)
    }
}
