module.exports.help = { name: "message" };

module.exports.event = async (msg, db = require("quick.db"), parsems = require("parse-ms")) => {
    if (msg.author.bot || msg.channel.type === "dm") return;
  let afklar = await db.fetch(`afk_${msg.author.id}, ${msg.guild.id}`);
  if (afklar) {
    db.delete(`afk_${msg.author.id}, ${msg.guild.id}`);
    db.delete(`afk-zaman_${msg.author.id}, ${msg.guild.id}`);
    msg
      .reply(`Artık AFK değilsin, aramıza tekrardan hoş geldin!`)
      .then(msg => msg.delete(9000));
    try {
      let takma_ad = msg.member.nickname.replace("[AFK]", "");
      msg.member.setNickname(takma_ad).catch(err => console.log(err));
    } catch (err) {
      console.log(err.message);
    }
  }
  let kullanıcı = msg.mentions.users.first();
  if (!kullanıcı) return;
  let zaman = await db.fetch(`afk-zaman_${kullanıcı.id}, ${msg.guild.id}`);
  let süre = parsems(Date.now() - zaman);
  let sebep = await db.fetch(`afk_${kullanıcı.id}, ${msg.guild.id}`);
  if (sebep.includes("discord.gg")) return;
  if (await db.fetch(`afk_${msg.mentions.users.first().id}, ${msg.guild.id}`)) {
    if (süre.days !== 0) {
      msg.channel.send(
        `**${kullanıcı}** kullanıcısı **${süre.days}** gün **${süre.hours}** saat **${süre.minutes}** dakika Önce **AFK** oldu.\n AFK Nedeni : **${sebep}**`
      );
      return;
    };
    if (süre.hours !== 0) {
      msg.channel.send(
        `**${kullanıcı}** kullanıcısı **${süre.hours}** saat **${süre.minutes}** dakika önce **AFK** oldu.\n AFK Nedeni : **${sebep}**`
      );
      return;
    };
    if (süre.minutes !== 0) {
      msg.channel.send(
        `**${kullanıcı}** kullanıcısı **${süre.minutes}** dakika önce **Afk** oldu.\n AFK Nedeni : **${sebep}**`
      );
      return;
    };
    if (süre.seconds !== 0) {
      msg.channel.send(
        `**${kullanıcı}** kullanıcısı **bir kaç saniye** önce **AFK** oldu.\n AFK Nedeni : **${sebep}**`
      );
      return;
    };
  };
}