import { Field } from 'payload/types'
import InputField from './InputField'
import Cell from './Cell'

const DurationPicker: Field = {
    type: 'row',
    fields: [
        {
            name: 'servings',
            type: 'group',
            fields: [
                {
                    name: 'quantity',
                    type: 'text',
                    admin: {
                        components: {
                            Field: InputField,
                            Cell,
                        },
                    },
                },
                {
                    name: 'yield',
                    type: 'text',
                    admin: {
                        disabled: true,
                    },
                },
            ],
        },
        {
            name: 'prepTime',
            type: 'group',
            fields: [
                {
                    name: 'hours',
                    type: 'text',
                    admin: {
                        components: {
                            Field: InputField,
                            Cell,
                        },
                    },
                },
                {
                    name: 'minutes',
                    type: 'text',
                    admin: {
                        components: {
                            Field: InputField,
                            Cell,
                        },
                    },
                },
            ],
        },
        {
            name: 'cookTime',
            type: 'group',
            fields: [
                {
                    name: 'hours',
                    type: 'text',
                    admin: {
                        components: {
                            Field: InputField,
                            Cell,
                        },
                    },
                },
                {
                    name: 'minutes',
                    type: 'text',
                    admin: {
                        components: {
                            Field: InputField,
                            Cell,
                        },
                    },
                },
            ],
        },
    ],
}

export default DurationPicker
