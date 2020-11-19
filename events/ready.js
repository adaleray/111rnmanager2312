module.exports.event = ({client}) => {
  
  client.on("ready", () => {
    console.log(client.user.username);
    client.user.setStatus("idle");
  });
  
};

module.exports.help = { name: "ready" };