module.exports.operate = async ({client, msg, args, author, uye}) => {
  const evet = "", hayir = "";
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(msj => msj.delete({timeout:5000}));
  function onlarFilterBenBeko(r, u) { return [evet, hayir].includes(r.emoji.id) && u.id === uye.id };
  if (!uye.voice.channel) return msg.channel.send("**Gitmek istediğin üye herhangi bir ses kanalında bulunmuyor.**").then(msj => msj.delete({timeout:5000}));
  if (uye.voice.channel.id === author.voice.channel.id) return msg.channel.send("**Gitmek istediğin üye ile aynı kanaldasınız.**").then(msj => msj.delete({timeout:5000}));
  if (!author.voice.channel) return msg.channel.send("**Bir sesli kanalında bulunmuyorsun.**").then(msj => msj.delete({timeout:5000}));
  
  await msg.channel.send(client.nrmlembed(`Merhaba ${uye}. ${author} adlı üye bulunduğun sesli kanalına gelmek istiyor. Onaylıyor musun? `)).then(async msj => {
    await msj.react(evet);
    await msj.react(hayir);
    msj.awaitReactions()
  });
};

module.exports.help = {
  name: "git",
  alias: []
};