module.exports.operate = async ({client, msg, args, author, uye, cfg}) => {
  if (!author.roles.cache.get(cfg.roles.transport) && !author.permissions.has("ADMINISTRATOR")) return msg.channel.send('**Gerekli yetkiye sahip değilsin.**').then(m => m.delete({ timeout: 3000 }));
  const channel = args[0];
  if (!channel) {
    
  } else if (channel) {
    var uyeler = msg.guild.channels.cache.get(channel).members.cache.array();
    let gidilecek = args[1];
    if (!gidilecek) return msg.channel.send("**Gitmek istediğin bir kanal idsi belirtmedin.**").then(msj => msj.delete({ timeout: 5000 }));
    await msg.channel.send(client.nrmlembed(`**Başarıyla \`${uyeler.size}\` üyeyi <#${channel}> kanalından <#${gidilecek}> kanalına taşıdım.**`)).then(msj => msj.delete({ timeout: 5000 }));
    uyeler.map(uye => uye.voice.setChannel(gidilecek));
  } else return;
};

module.exports.help = {
  name: "topluçek",
  alias: []
};