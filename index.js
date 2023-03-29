require("dotenv").config();
const zendesk = require("node-zendesk");

const client = zendesk.createClient({
  username: process.env.ZENDESK_USER_NAME_DE,
  token: process.env.ZENDESK_TOKEN_DE,
  remoteUri: `${process.env.ZENDESK_URL_DE}/api/v2`,
});

const userID = 7755761668114;

(async () => {
  try {
    console.log("before");
    console.log(await client.useridentities.list(userID));

    // first number
    // user do not have primary phone number yet
    // if it does, it wont overwrite previous primary and phone will be added as primary: false
    await client.useridentities.create(userID, {
      identity: {
        type: "phone_number",
        value: "+4930972559919",
        primary: true,
      },
    });
    // second number
    await client.useridentities.create(userID, {
      identity: {
        type: "phone_number",
        value: "+4930721145146",
        primary: false,
      },
    });

    console.log("after");
    console.log(await client.useridentities.list(userID));
  } catch (e) {
    console.error(e);
  }
})();
