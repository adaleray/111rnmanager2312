module.exports = (client) => {
  client.user.setStatus("idle");
}

module.exports.help = { name: "ready" };