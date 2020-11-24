module.exports.operate = async ({client, msg, args, author, cfg}) => {
  const evet = "✅";
  const hayir = "❌";
  function onlarFilterBenBeko(r, u) { return [evet, hayir].includes(r.emoji.name) && u.id === author.id };
  if (!cfg.sahipler.includes(author.id)) return;
  if (!author.voice.channel) return msg.channel.send("**Bu komutu kullanmak için bir kanalda olman gerek.**").then(msj => msj.delete({ timeout: 5000 }));
  let tip = args[0];
  var yetkililer = msg.guild.members.cache.filter(y => y.roles.cache.some(r => cfg.roles.yetkiliRoller.includes(r.id)));
  if (tip === "çek") {
    var kanal = author.voice.channel.id;
    var ytler = yetkililer.filter(yetkili => yetkili.voice.channel && msg.guild.members.cache.get(yetkili.id).voice.channel.id !== author.voice.channel.id);
    if (ytler.size === 0) return msg.channel.send("**Seste çekilecek yetkili bulunmuyor.**").then(msj => msj.delete({ timeout: 5000 }));
    await msg.channel.send(`\`${ytler.size}\` üye kanala çekiliyor.`);
    ytler.map(user => user.voice.setChannel(kanal));
  } else if (tip === "katıldı") {
  
  };
};

module.exports.help = {
  name: "toplantı",
  alias: []
};