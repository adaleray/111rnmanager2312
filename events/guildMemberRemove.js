module.exports.event = (uye, client = global.client, db = require("quick.db"), cfg = require("../config.json")) => {
  client.cezalilar = new Set();
  
  let jailRolü = db.get(``);
};

module.exports.help = { name: "guildMemberRemove" };