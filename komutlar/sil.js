module.exports.operate = async ({client, msg, args, author}) => {
  if (!author.permissions.has("MANAGE_MESSAGES")) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({timeout: 5000}));
  let silinecek = Number(args[0]);
  let silinen = 0;
  for (var i = 0; i < silinen; i++) {
    await msg.channel.bulkDelete(Math.floor(silinecek/2)).then(d => silinen = d.size);
    silinecek -= silinen;
  }
};

module.exports.help = {
  name: "sil",
  alias: ["clear"]
};