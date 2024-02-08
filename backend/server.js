require('dotenv').config();
const express = require('express');
const sgMail = require('@sendgrid/mail');

  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Server is running.');
  });

  app.post('/sendEmail', async (req, res) => {
    const { firstName, phoneNumber, address, selectedService } = req.body;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: process.env.NOTIFICATION_EMAIL,
      from: process.env.EMAIL_USER,
      subject: 'Lumityö Tilaus Ilmoitus',
      text: `Tilauksen tiedot:\n\nName: ${firstName}\nPhone: ${phoneNumber}\nAddress: ${address}\nService: ${selectedService}`,
    };
  
    try {
      await sgMail.send(msg);
      console.log('Email sent successfully');
      res.status(200).send('Email Sent Successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  