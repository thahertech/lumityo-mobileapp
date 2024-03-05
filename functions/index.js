require("dotenv").config();
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

const serviceAccount = require("./lumityo-project-9bf4be909775.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmail = functions.https.onCall(async (data, context) => {
  const {firstName, phoneNumber, address, selectedService} = data;

  const msg = {
    to: "XXX",
    from: "XXX@gmail.com",
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

  try {
    await sgMail.send(msg);

    functions.logger.info("Order successfully stored and email sent:", {
      structuredData: true,
      orderDetails: {
        firstName,
        phoneNumber,
        address,
        selectedService,
      },
    });


    return {result: "Order successfully received."};
  } catch (error) {
    functions.logger.error("Error processing order:", {
      structuredData: true,
      error: error.message,
    });

    // Handle error accordingly
    return {error: "Error processing order,try again later."};
  }
});