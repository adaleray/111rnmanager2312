module.exports.event = (uye, client = global.client, db = require("quick.db"), cfg = require("../config.json")) => {
  client.cezalilar = new Set();
  if (uye.roles.cache.get(cfg.roles.jail)) {
    client.cezalilar.set(uye.id);
  };
};

module.exports.help = { name: "guildMemberRemove" };