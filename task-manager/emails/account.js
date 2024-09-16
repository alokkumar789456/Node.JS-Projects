import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.MAILAPI);

//! IMP note
//! mail can only sent from: "LOKI <onboarding@resend.dev>",
//! to: ["alokkumar77954@gmail.com"] because its free version
//! so create account only from  alokkumar77954@gmail.com and 
//! API key will expire every 30 days 


// (async function () {
//   const { data, error } = await resend.emails.send({
//     from: "LOKI <onboarding@resend.dev>",
//     to: ["alokkumar77954@gmail.com"],
//     subject: "Hello World",
//     html: "<strong>It works!</strong>",
//   });

// if (error) {
//   return console.error({ error });
// }

// console.log({ data });
// })();

//! creating a welcome message
const sendWelcomeEmail = async (email, name) => {
  try {
    await resend.emails.send({
      from: "ALOK <onboarding@resend.dev>",
      to: [email],
      subject: "🎉 Thanks for joining in!",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #007bff;">Welcome to The App, ${name}! 🎊</h2>
          <p>
            We're absolutely thrilled to have you on board! 🌟 The App is here to make your life easier and more fun. 
            We hope you enjoy all the amazing features we have in store for you.
          </p>
          <p>
            If you have any questions or just want to say hi 👋, feel free to reach out. We're always here to help! 😊
          </p>
          <p style="font-size: 0.9em; color: #555;">
            Best regards,<br>
            <strong>ALOK</strong> 🚀<br>
            Dummy Dummy Dumb!
          </p>
        </div>
      `,
    });
    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
};



const sendCancelmail = async (email, name) => {
  try {
    await resend.emails.send({
      from: "ALOK <onboarding@resend.dev>",
      to: [email],
      subject: "😔 Is there anything else we can help with?",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #ff4c4c;">We're sorry to see you go, ${name}! 😢</h2>
          <p>
            You’ve successfully canceled your account on The App. We're sad to see you leave, but we'd really love to 
            know what we can do better. Your feedback means a lot to us! 🙏
          </p>
          <p>
            If you ever decide to come back, we'll be here waiting for you! ❤️
          </p>
          <p style="font-size: 0.9em; color: #555;">
            Best regards,<br>
            <strong>ALOK</strong> ✨<br>
            Dummy Dummy Dumb!
          </p>
        </div>
      `,
    });
    console.log("Cancellation email sent successfully");
  } catch (error) {
    console.error("Failed to send cancellation email:", error);
  }
};



export default { sendWelcomeEmail, sendCancelmail };
