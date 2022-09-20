import { Router } from 'express';
import pkg from 'whatsapp-web.js';
const { MessageMedia, Location } = pkg;
import validURL from 'valid-url';
import fs from 'fs';

import { OK, BadRequest, unAuthenticated } from '../../shared/util/http-responses.util.js';
import WhatsappReminderDataAccess from '../data/whatsapp/whatsapp-reminder.data.js';
import { client } from '../whatsapp-web/whatsapp-reminder.js';

/*  The whatsappReminder router that holds all module routes. */
export const whatsappReminderRouter = Router();

/**
 * The relative route for the auth.
 *
 * No leading or trailing slashes required.
 */
export const whatsappReminderRelativeRoute = 'whatsapp-reminder';

whatsappReminderRouter.post('', async (req, res, next) => {
  try {
    const result = await WhatsappReminderDataAccess.create(req.body);
    console.log({ result });
    if (Object.keys(result.error).length) {
      next(result.error);
    } else if (result.validationErrors && result.validationErrors.length) {
      BadRequest(res, { errors: result.validationErrors });
    } else if (result.isNotFound) {
      return unAuthenticated(res);
    } else if (result.data) {
      OK(res, result);
    }
  } catch (error) {
    next(error);
  }
});

/* Get all whatsappReminders route. */
whatsappReminderRouter.get('/whatsappReminders', async (req, res, next) => {
  try {
    const result = await WhatsappReminderDataAccess.getAllWhatsappReminders();
    if (Object.keys(result.error).length) {
      next(result.error);
    } else if (result.isNotFound) {
      return unAuthenticated(res);
    } else if (result.data) {
      OK(res, result);
    }
  } catch (error) {
    next(error);
  }
});

/* Get whatsappReminder by id route. */
whatsappReminderRouter.get('/:id', async (req, res, next) => {
  try {
    const result = await WhatsappReminderDataAccess.findById(req.params.id);
    if (Object.keys(result.error).length) {
      next(result.error);
    } else if (result.isNotFound) {
      return unAuthenticated(res);
    } else if (result.data) {
      OK(res, result);
    }
  } catch (error) {
    next(error);
  }
});

/* ======================================================== */
whatsappReminderRouter.post('/send-message/:phone', async (req, res) => {
  let phone = req.params.phone;
  let message = req.body.message;

  if (phone == undefined || message == undefined) {
    res.send({ status: 'error', message: 'please enter valid phone and message' });
  } else {
    const data = await client.sendMessage(phone + '@c.us', message);

    if (data.id.fromMe) {
      res.send({ status: 'success', message: `Message successfully sent to ${phone}` });
    }
  }
});
