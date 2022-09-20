import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import { counter } from '../../../shared/util/counter.util.js';

const reminderWhatsappSchema = Schema({
  reminderMsg: { type: String },
  reminderAt: { type: Date },
  isReminder: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

// counter('WhatsappReminder', reminderWhatsappSchema, 'createdAt');
export default model('WhatsappReminder', reminderWhatsappSchema);
