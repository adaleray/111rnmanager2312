module.exports.event = (client = global.client) => {
  console.log(client.user.id);
  client.user.setStatus("idle");
};

module.exports.help = { name: "ready" };