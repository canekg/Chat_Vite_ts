/* eslint-disable no-undef */
const rollbarConfig = {
  accessToken: process.env.ROLLBAR_KEY,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: 'production',
};

export default rollbarConfig;
