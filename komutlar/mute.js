module.exports.operate = async ({client, msg, args, author, uye, cfg, db}) => {
  if (!author.roles.cache.get(cfg.roles.muteH) && !author.permissions.has("MANAGE_ROLES")) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(m => m.delete({ timeout: 5000 }));
  
  if (!uye.roles.cache.get(cfg.roles.muted)) {
    
  };
  
};

module.exports.help = {
  name: "mute",
  alias: ["chatmute", "cmute", "chat-mute", "tempmute"]
};