import { Schema, models, model } from 'mongoose';

const SingleOrderSchema = new Schema({
  
  id: { type: String, required: true },
  quantity: { type: Number, required: true },

}, { _id: false });

const OrderModelSchema = new Schema({

  order: { type: [SingleOrderSchema], required: true },
  location: { type: String, required: true }

}, { timestamps: true });

const OrderModel = models.order || model('order', OrderModelSchema);

export default OrderModel;