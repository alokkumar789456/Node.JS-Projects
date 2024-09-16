// __mocks__/resend.js
//! this will replace the actual api by an empty object that object only is referred as api
//! mocks are done to stop triggers for sending email everyTime while testing 
export const Resend = jest.fn().mockImplementation(() => ({}));



//! this is for more info but u are good to go with that one line 
// export const Resend = jest.fn().mockImplementation(() => ({
//   emails: {
//     send: jest.fn().mockImplementation((emailOptions) => {
//       // Mock implementation for send method
//       if (
//         emailOptions.from === "ALOK <onboarding@resend.dev>" &&
//         emailOptions.to[0] === "alokkumar77954@gmail.com"
//       ) {
//         return Promise.resolve({
//           success: true,
//           messageId: "mockMessageId",
//         });
//       } else {
//         return Promise.reject(new Error("Invalid email or API key"));
//       }
//     }),
//   },
// }));
