import Joi from 'joi';

export const usersSchema = Joi.object({
    name: Joi.string().required()
})