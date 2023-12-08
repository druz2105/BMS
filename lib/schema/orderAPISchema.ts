import Joi from "joi";

export interface CreateOrderSchema {
  bookId: string;
  quantity: number;
}

export const CreateOrderValidator = Joi.object<CreateOrderSchema>({
  bookId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
}).unknown(false);
