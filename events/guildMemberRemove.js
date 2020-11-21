module.exports.event = (uye, client = global.client, db = require("quick.db"), cfg = require("../config.json")) => {
  if (uye.roles.cache.get(cfg.roles.jail)) {
    client.cezalilar.set(uye.id);
  } else if (uye.roles.cache.get(cfg.roles.muted)) {
    client.cmuteliler.set(uye.id);
  };
};

module.exports.help = { name: "guildMemberRemove" };