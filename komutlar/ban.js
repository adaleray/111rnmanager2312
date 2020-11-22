const banAtanlar = new Set();
const moment = require("moment");

const tarih = moment(Date.parse(new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul"}))).format("LLL");

module.exports.operate = ({msg, client, uye, author, args, db, cfg}) => {
  if (!author.permissions.has("BAN_MEMBERS") && !author.roles.cache.get(cfg.roles.banH)) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
  if (!uye) return msg.channel.send("**Bir üyeyi etiketlemelisin.**").then(x => x.delete({ timeout: 5000 }));
  if (uye.permissions.has("BAN_MEMBERS") && uye.roles.cache.get(cfg.roles.banH)) return msg.channel.send("**Ban yetkisi olan birisini banlayamazsın.**").then(a => a.delete({ timeout: 5000 }));
  if (!banAtanlar[msg.author.id])
    banAtanlar[msg.author.id] = {
      sayi: 0
    };
  if (banAtanlar[msg.author.id].sayi >= 3) return msg.channel.send("**1 saat içinde maximum 3 ban atabilirsin.**").then(a => a.delete({ timeout: 5000 }));
  let reason = args[1] ? args.slice(1).join(" ") : "Sebep Girilmedi.";
  db.set(`banSebebi_${uye.id}, ${msg.guild.id}`, reason);
  db.set(`banAtan_${uye.id}, ${msg.guild.id}`, msg.author.tag);
  db.set(`banZamani_${uye.id}, ${msg.guild.id}`, tarih);
  db.add(`banSayisi_${msg.author.id}, ${msg.guild.id}`, 1);
  uye.ban({
    reason: reason,
    days: 7
  });
    const embed = new MessageEmbed()
      .setDescription(`**${uye.user.tag}** adlı üye ${msg.author} tarafından **${reason}** sebebiyle sunucudan yasaklandı`)
      .setColor("BLACK")
      .setTimestamp()
    msg.channel.send({embed:{description:``}})
    msg.channel.send(embed);
    banAtanlar[msg.author.id].sayi++;
    setTimeout(() => {
      if (banAtanlar[msg.author.id].sayi >= 1) {
        banAtanlar[msg.author.id].sayi = 0;
      };
    }, 3600000);
}

module.exports.help = {
  name: "ban",
  alias: ["yak", "yargı", "yoket", "idam"]
};