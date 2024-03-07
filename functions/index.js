require("dotenv").config();
const express = require('express');
const cors = require('cors');
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

const serviceAccount = require("./lumityo-project-9bf4be909775.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
app.use(cors({
  origin: true,
  allowedHeaders: ["Content-Type"],
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.post('/sendEmail', async (req, res) => {
  try {
    const data = req.body; // Assuming data is expected in the request body

    console.log("Received data:", data);

    const { firstName, phoneNumber, address, selectedService } = data;

    // Check required properties are present
    if (!firstName || !phoneNumber || !address || !selectedService) {
      return res.status(400).json({
        error: "MISSING REQUIRED DATA!!",
      });
    }

    const msg = {
      to: "thaher.alamir@hotmail.com",
      from: "onefakeblog@gmail.com",
      subject: "New Order",
      text: `
        New order details:
        -----------------
        Service: ${selectedService}
        Name: ${firstName}
        Phone Number: ${phoneNumber}
        Address: ${address}
      `,
    };

    const sendGridResponse = await sgMail.send(msg);
    functions.logger.info("SendGrid Response:", sendGridResponse);

    functions.logger.info("Order successfully stored and email sent:", {
      structuredData: true,
      orderDetails: {
        firstName,
        phoneNumber,
        address,
        selectedService,
      },
    });

    return res.status(200).json({ result: "Order successfully received." });
  } catch (error) {
    console.error("Error processing order:", error);

    // Handle error accordingly
    return res.status(500).json({
      error: "Error processing order, try again later.",
    });
  }
});

// No need for functions.https.onCall here

exports.api = functions.https.onRequest(app);
