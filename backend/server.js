const express = require('express');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running.');
});


app.post('/sendEmail', async (req, res) => {
  const { firstName, phoneNumber, address, selectedService } = req.body;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: 'onefakeblog@gmail.com',
    from: 'User_1@Lumityö.com',
    subject: 'Lumityö Tilaus Vahvistus',
    text: `
      Tilaus Tiedot:\n
      Nimi: ${firstName}\n
      Numero: ${phoneNumber}\n\n
      Osoite: ${address}\n
      Palvelu: ${selectedService}`,
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
