module.exports.event = (client = global.client, { sunucu, roles } = require("../config.json"), cfg = require("../config.json"), db = require("quick.db")) => {
  yasakliTag(client, sunucu, roles, cfg, db);
};

module.exports.help = { name: "ready" };

async function yasakliTag(client, sunucu, roles, cfg, db) {
  var yasakliTag = db.get(`yasakliTag_${sunucu}`) || cfg.tag.yasakliTaglar;
  
  let guild = client.guilds.cache.get(sunucu);
  guild.members.cache.filter(u => {
    yasakliTag.forEach(tag => {
      return (u.user.username.includes(tag));
    })
  }).map(u => console.log(u => u.user.usernam));
}