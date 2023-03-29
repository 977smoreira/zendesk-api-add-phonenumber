require("dotenv").config();
const zendesk = require("node-zendesk");

const client = zendesk.createClient({
  username: process.env.ZENDESK_USER_NAME_DE,
  token: process.env.ZENDESK_TOKEN_DE,
  remoteUri: `${process.env.ZENDESK_URL_DE}/api/v2`,
});

const userID = 7755761668114;
// show users contacts
client.useridentities
  .list(userID)
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
