module.exports.operate = async ({client, msg, args, author, uye, cfg, db}) => {
  if (!author.roles.cache.get(cfg.roles.botc) && !author.permissions.has("MANAGE_ROLES")) return;
  var kullanici = author || uye;
  
  const erkek = db.get(`erkekTeyit_${kullanici.id}`) || 0;
  const kız = db.get(`karıTeyit_${kullanici.id}`) || 0;
  const jail = db.get(`jailAtma_${kullanici.id}`) || 0;
  const mute = db.get(`muteAtma_${kullanici.id}`) || 0;
  const ban = db.get(`banAtma_${kullanici.id}`) || 0;

  msg.channel.send({
    embed: { author: {} }
  })
};

module.exports.help = {
  name: "ytbilgi",
  alias: ["ybilgi"]
};