const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");


admin.initializeApp();

exports.sendEmail = functions.https.onRequest(async (req, res) => {
  console.log("Request received:", req.body);
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  // Ensure only POST requests are allowed
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  // Extract data from request body
  const {firstName, phoneNumber, address, selectedService} = req.body;

  // Retrieve SendGrid API Key from environment configuration
  const sendGridApiKey = functions.config().sendgrid.apikey;

  if (!sendGridApiKey) {
    return res.status(500)
        .send("SendGrid API key is not set in the environment configuration.");
  }

  sgMail.setApiKey(sendGridApiKey);
  console.log(sendGridApiKey);

  // Construct email message
  const msg = {
    to: "lumitoimeksiannot@gmail.com",
    from: "onefakeblog@gmail.com",
    subject: "Lumityö Tilaus Vahvistus",
    text: `
      Tilaus Tiedot:
      Nimi: ${firstName}
      Numero: ${phoneNumber}
      Osoite: ${address}
      Palvelu: ${selectedService}`,
  };

  // Send email
  try {
    await sgMail.send(msg);
    console.log("Email sent successfully");
    res.status(200).json({success: true});
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({success: false, error: "Internal Server Error"});
  }
});
