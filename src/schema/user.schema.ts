import Joi from "joi";

export const getUserQuerySchema = Joi.object({
  q: Joi.string().optional(),
}).options({
  stripUnknown: true,
});

export const createUserBodySchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "name is required",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "email is required",
    "string.email": "email should be in valid form",
  }),

  password: Joi.string()
    .required()
    .min(8)
    .messages({
      "any.required": "password is required",
      "string.min": "password should be minimum 8 characters",
      "password.uppercase":
        "at least one password character should be uppercase",
      "password.lowercase":
        "at least one password character should be lowercase",
      "password.specialcharacters":
        "at least one password letter should be uppercaseCharacter",
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("password.uppercase");
      }
      if (!/[a-z]/.test(value)) {
        return helpers.error("password.lowercase");
      }
      if (!/[!@#$%]/.test(value)) {
        return helpers.error("password.specialcharacters");
      }
      return value;
    }),

  role: Joi.string().valid("user", "superUser").required().messages({
    "any.required": "role is required",
    "any.only": "role must be either 'user' or 'superUser'",
  }),

  permissions: Joi.array()
    .items(Joi.string().valid("get", "read", "update", "delete"))
    .required()
    .messages({
      "any.required": "permissions are required",
      "array.includes": "permissions must be one of get,read,update,delete",
    }),
}).options({
  stripUnknown: true,
});

export const loginUserBodySchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "email is required",
    "string.email": "email should be in valid form",
  }),
  password: Joi.string().required().messages({
    "any.required": "password is required",
  }),
});

export const updateUserBodySchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional().messages({
    "string.email": "email should be in valid form",
  }),

  password: Joi.string()
    .optional()
    .min(8)
    .messages({
      "string.min": "password should be minimum 8 characters",
      "password.uppercase":
        "at least one password character should be uppercase",
      "password.lowercase":
        "at least one password character should be lowercase",
      "password.specialcharacters":
        "at least one password letter should be uppercaseCharacter",
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("password.uppercase");
      }
      if (!/[a-z]/.test(value)) {
        return helpers.error("password.lowercase");
      }
      if (!/[!@#$%]/.test(value)) {
        return helpers.error("password.specialcharacters");
      }
      return value;
    }),
});
