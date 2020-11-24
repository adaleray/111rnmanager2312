module.exports.operate = async ({client, msg, args, author, uye, cfg}) => {
  if (!author.roles.cache.get(cfg.roles.transport) && !author.permissions.has("ADMINISTRATOR")) return msg.channel.send('**Gerekli yetkiye sahip değilsin.**').then(m => m.delete({ timeout: 3000 }));
  if (!args[0]) return msg.channel.send("**Bir kanal idsi girmelisin.**").then(msj => msj.delete({ timeout: 5000 }));
  if (!args[1]) {
    let kanal = author.voice.channel.id;
    var uyeler = msg.guild.members.cache.filter(u => u.voice.channel.id === kanal)
    if (uyeler.size < 1) return msg.channel.send("**Toplu taşıma yapmak istediğin kanalda üye bulunmamakta.**").then(msj => msj.delete({ timeout: 5000 })); 
  } else {
    var kanal = msg.guild.channels.cache.get(args[0]);
    var kanal2 = msg.guild.channels.cache.get(args[1]);
    var uyeler = kanal.members.cache.array();
    if (uyeler.size < 1) return msg.channel.send("**Toplu taşıma yapmak istediğin kanalda üye bulunmamakta.**").then(msj => msj.delete({ timeout: 5000 }));
    if (kanal.id === kanal2.id) return msg.channel.send("**Aynı kanala üye taşıyamazsın.**").then(msj => msj.delete({ timeout: 5000 }));
    await msg.channel.send(client.nrmlembed(`** \`${uyeler.size}\` adet üye ${kanal.name} kanalından ${kanal2.name} kanalına taşınıyor.**`)).then(msj => msj.delete({ timeout: 5000 }));
    uyeler.map(u => u.voice.setChannel(kanal2.id));
  };
};

module.exports.help = {
  name: "topluçek",
  alias: []
};