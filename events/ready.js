const { Client } = require("discord.js");
const client = new Client();
module.exports.event = () => {
  
  console.log(client.user.id);
  client.user.setStatus("idle");
};

module.exports.help = { name: "ready" };