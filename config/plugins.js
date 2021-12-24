module.exports = ({ env }) => ({
  email: {
    provider: "sendgrid",
    providerOptions: {
      apiKey: env("SENDGRID_API_KEY"),
    },
    settings: {
      defaultFrom: env("FROM_EMAIL"),
      defaultReplyTo: env("REPLY_TO_EMAIL"),
    },
  },
});
