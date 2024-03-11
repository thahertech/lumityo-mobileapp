const admin = require("firebase-admin");
const functions = require("firebase-functions");
const transporter = require("../mailerConfig"); 


admin.initializeApp();


exports.sendEmail = functions.region("us-central1").https.onCall(
    async (data, context) => {
      try {

        const {firstName, phoneNumber, address, selectedService} = data;

        console.log("Received Order Data:", data);

        // Defining mailOptions
        const mailOptions = {
          from: "info@XXX.com",
          to: "XXX@hotmail.com",
          subject: "New Order Received",
          html: `
            <p>First Name: ${firstName}</p>
            <p>Phone Number: ${phoneNumber}</p>
            <p>Address: ${address}</p>
            <p>Selected Service: ${selectedService}</p>
          `,
        };

        // Log the mail options
        console.log("Mail Options:", mailOptions);

        // Returning result
        await transporter.sendMail(mailOptions);

        console.log("Email sent successfully!");
        return "Email sent successfully";
      } catch (error) {
        console.error("Error sending email:", error);
        throw new functions.https.HttpsError("Error sending", error.message);
      }
    },
);
