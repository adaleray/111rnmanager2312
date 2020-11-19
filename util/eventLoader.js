module.exports = ({client}) => {
  var reqEvent = event) => require(`../events/${event}`);
  client.on("message", reqEvent("message"));
  
};