import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import pkg2 from 'qrcode-terminal';
const qrCode = pkg2;

export const client = new Client({
  authStrategy: new LocalAuth(),
});

export class WhatsappApi {
  static async setWhatsappReminder() {
    client.on('qr', (qr) => {
      // Generate and scan this code with your phone
      console.log({ qr });
      qrCode.generate(qr, { small: true });
      console.log('QR RECEIVED', qr);
    });

    client.on('ready', async () => {
      console.log('Client is ready!');
      await client.setDisplayName('CRMHOLCK');
      const x = client.info;
      console.log({ x });
    });

    client.on('message', (msg) => {
      if (msg.body == '!ping') {
        msg.reply('pong');
      }
    });
    client.initialize();
  }
}
