import Joi from "joi";

const CardStatus = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  READY: "ready",
  ACKNOWLEDGE: "acknowledge",
};

const userScheme = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
const loginScheme = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
const requestCardSchema = Joi.object({
  branchName: Joi.string().required(),
  cardType: Joi.string().min(6).required(),
  quantity: Joi.number().integer().min(1).required(),
  dateRequested: Joi.date().default(() => new Date()),
  cardCharges: Joi.number().precision(2).min(0).required(),
  batch: Joi.string().required(),
  status: Joi.string()
    .valid(...Object.values(CardStatus))
    .default(CardStatus.PENDING),
});



export const validateUser = (req, res, next) => {
  const { error } = userScheme.validate(req.body);
  if (error)
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  next();
};
export const validateLogginUser = (req, res, next) => {
  const { error } = loginScheme.validate(req.body);
  if (error)
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  next();
};
export const validateCardRequest = (req, res, next) => {
  const { error } = requestCardSchema.validate(req.body);
  if (error)
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  next();
};