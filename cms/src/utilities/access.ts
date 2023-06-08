import { FieldAccess } from 'payload/types'
import { Access } from 'payload/config'

export const adminCollectionAccess: Access = ({ req: { user } }) => {
    if (user.role !== 'admin') return false
    return true
}

export const adminFieldAccess: FieldAccess = ({ req: { user } }) => {
    if (user.role !== 'admin') return false
    return true
}
