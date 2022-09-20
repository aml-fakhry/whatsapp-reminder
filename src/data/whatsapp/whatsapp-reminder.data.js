import { Result } from '../../../shared/models/data-result.model.js';
import whatsappReminderModel from './whatsapp-reminder.model.js';

/**
 * The whatsappReminder data-access service that includes the functionalities to create and read a whatsappReminder.
 */
export default class WhatsappReminderDataAccess {
  /**
   * Creates a new whatsappReminder based on the provided data-model.
   * @param data The data-model to create the new whatsappReminder.
   */
  static async create(data) {
    const result = new Result();
    try {
      /**
       * Create whatsappReminder.
       * update and push new post to user whatsappReminders.
       */
      const whatsappReminder = await whatsappReminderModel.create({
        reminderMsg: data.reminderMsg,
        reminderAt: data.reminderAt,
        // isReminder: data.isReminder,
      });

      result.data = (await this.findById(whatsappReminder._id)).data;
    } catch (error) {
      result.error = error;
    }
    return result;
  }

  /**
   * Finds the whatsappReminder with the given id.
   * @param whatsappReminderId The id in whatsappReminder.
   */
  static async findById(whatsappReminderId) {
    const result = new Result();

    try {
      result.data = await whatsappReminderModel.findById(whatsappReminderId).sort({ createdAt: -1 });
      result.isNotFound = !result.data;
    } catch (error) {
      result.error = error;
    }
    return result;
  }

  /**
   * Find all whatsappReminders.
   */
  static async getAllWhatsappReminders() {
    const result = new Result();

    try {
      result.data = await whatsappReminderModel.find().sort({ createdAt: -1 });
    } catch (error) {
      result.error = error;
    }
    return result;
  }
}
