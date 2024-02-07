require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Server is running.'); // or any other response you want to send
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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
