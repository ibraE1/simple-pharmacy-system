import joi from "joi";
import objectId from "joi-objectid";

joi.objectId = objectId(joi);

const userSchema = joi.object({
  email: joi.string().email().required(),
  name: joi
    .string()
    .pattern(/^(?! )[A-Za-z\s]+$/)
    .required(),
  password: joi.string().alphanum().min(6).required(),
  national_id: joi.number().required(),
  avatar_image: joi.string(),
  addresses: joi.array().items(joi.string().required()),
  notes: joi.string(),
  last_login: joi.date(),
});

const userUpdateSchema = joi.object({
  email: joi.string().email(),
  name: joi.string().pattern(/^(?! )[A-Za-z\s]+$/),
  password: joi.string().alphanum().min(6),
  avatar_image: joi.string(),
  addresses: joi.array().items(joi.string()),
  notes: joi.string(),
});

const adminSchema = joi.object({
  email: joi.string().email().required(),
  name: joi
    .string()
    .pattern(/^(?! )[A-Za-z\s]+$/)
    .required(),
  password: joi.string().alphanum().min(6).required(),
  national_id: joi.number().required(),
  avatar_image: joi.string(),
  blocked: joi.boolean(),
  role: joi.string().valid("admin", "doctor").required(),
});

const adminUpdateSchema = joi.object({
  email: joi.string().email(),
  name: joi.string().pattern(/^(?! )[A-Za-z\s]+$/),
  password: joi.string().alphanum().min(6),
  avatar_image: joi.string(),
  blocked: joi.boolean(),
});

const orderSchema = joi.object({
  user_id: joi.objectId().required(),
  image: joi.string().required(),
  address: joi.string().required(),
  items: joi.array().items(
    joi.object({
      medicine_id: joi.objectId().required(),
      quantity: joi.number().integer().required(),
    })
  ),
  total_price: joi.number(),
  status: joi
    .string()
    .valid(
      "Processing",
      "WaitingForUserConfirmation",
      "Canceled",
      "Confirmed",
      "Delivered"
    )
    .required(),
});

const orderUpdateSchema = joi.object({
  image: joi.string(),
  address: joi.string(),
  items: joi.array().items(
    joi.object({
      medicine_id: joi.objectId(),
      quantity: joi.number().integer(),
    })
  ),
  total_price: joi.number(),
  status: joi
    .string()
    .valid(
      "Processing",
      "WaitingForUserConfirmation",
      "Canceled",
      "Confirmed",
      "Delivered"
    ),
});

const medicineSchema = joi.object({
  name: joi.string().required(),
  price: joi.number().required(),
});

const medicineUpdateSchema = joi.object({
  name: joi.string(),
  price: joi.number(),
});

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    const valid = error == null;

    if (!valid) {
      return res.status(400).json(error.message);
    }

    next();
  };
};

const validateId = () => {
  return (req, res, next) => {
    const { error } = joi.objectId().validate(req.params.id);
    const valid = error == null;

    if (!valid) {
      return res.status(400).json("invalid id pattern");
    }

    next();
  };
};

export {
  userSchema,
  adminSchema,
  medicineSchema,
  orderSchema,
  userUpdateSchema,
  adminUpdateSchema,
  medicineUpdateSchema,
  orderUpdateSchema,
  validateBody,
  validateId,
};
