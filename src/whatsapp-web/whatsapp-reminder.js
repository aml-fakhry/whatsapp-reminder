import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import pkg2 from 'qrcode-terminal';
const qrCode = pkg2;

export class WhatsappApi {
  static async setWhatsappReminder() {
    const client = new Client({
      authStrategy: new LocalAuth(),
    });
    client.on('qr', (qr) => {
      // Generate and scan this code with your phone
      console.log({ qr });
      qrCode.generate(qr, { small: true });
      console.log('QR RECEIVED', qr);
    });

    client.on('ready', () => {
      console.log('Client is ready!');
    });

    client.on('message', (msg) => {
      if (msg.body == '!ping') {
        msg.reply('pong');
      }
    });
    client.initialize();
  }
}
