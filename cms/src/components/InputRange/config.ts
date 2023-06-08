import { Field } from 'payload/types'
import InputRange from './InputRange'

const Rating: Field = {
    name: 'rating',
    type: 'number',
    admin: {
        components: {
            Field: InputRange,
        },
    },
}

export default Rating
