import Joi from "joi";

export const getTodoQuerySchema = Joi.object({
  q: Joi.string().optional(),
}).options({
  stripUnknown: true,
});

export const createTodoBodySchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "title is required",
  }),
  completed: Joi.boolean().required().messages({
    "any.required": "completion status is required and should be boolean",
  }),
});

export const updateTodoBodySchema = Joi.object({
  title: Joi.string().optional(),
  completed: Joi.boolean().optional(),
});
