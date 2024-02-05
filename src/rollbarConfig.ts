const rollbarConfig = {
  accessToken: import.meta.env.ROLLBAR_KEY,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: 'production',
};

export default rollbarConfig;
