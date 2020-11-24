module.exports.operate = async ({client, msg, args, author, uye}) => {
  if (!author.permissions.has("ADMINISTRATOR")) return msg.channel.send('**Gerekli yetkiye sahip değilsin.**').then(m => m.delete({ timeout: 3000 }));
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(m => m.delete({ timeout: 3000 }));
  if (!uye.voice.channel) return msg.channel.send("**Etiketlediğin üye bir ses kanalında bulunmuyor.**").then(m => m.delete({ timeout: 3000 }));
  if (!args[1]) {
    if (!author.voice.channel) return msg.channel.send("**Bir sesli kanalında bulunmuyorsun.**").then(m => m.delete({ timeout: 4000 }));
    if (author.voice.channel.id === uye.voice.channel.id) return msg.channel.send("**Bu üyeyle aynı kanaldasınız.**").then(m => m.delete({ timeout: 5000 }));
    await uye.voice.setChannel(author.voice.channel.id).catch(err => msg.channel.send(err.message));
    await msg.channel.send(client.nrmlembed(`**${uye} adlı üye başarıyla kanala çekildi.**`)).then(m => m.delete({ timeout: 5000 }));
  } else if (
    [
      "at",
      "null",
      "kick",
      "kanaldanat",
      "kanaldan-at",
      "kanal-at"
    ].includes(args[1])
  ) {
      await uye.voice.kick().catch(err => msg.channel.send(err.message));
      await msg.channel.send(client.nrmlembed(`**${uye} adlı üye başarıyla kanaldan atıldı**`)).then(a => a.delete({ timeout: 5000 }));
    } else {
      if (!author.voice.channel) return msg.channel.send("**Bir sesli kanalında bulunmuyorsun.**").then(m => m.delete({ timeout: 4000 }));
      await uye.voice.setChannel(args[1]).catch(err => msg.channel.send(err.message));
      await msg.channel.send(client.nrmlembed(`**${uye} adlı  başarıyla <#${args[1]}> kanalına gönderildi.**`)).then(a => a.delete({ timeout: 5000 }));
    };
};

module.exports.help = {
  name: "çek",
  alias: []
}

module.exports.operate = ({msg, args, author, cfg}) => {
  if (!author.permissions.has("ADMINISTRATOR")) return;
  if (!args[0]) {
    let uyeler = msg.guild.members.cache.filter(u => {
      return (
        u.roles.cache.some(r => cfg.roles.yetkiliRoller.includes(r.id)) && !u.voice.channel && u.presence.status !== "offline"
      )
    }).map(u => u.user);
    msg.channel.send(`**Aktif olup seste olmayan yetkililer : \n \n** ${uyeler.join(", \n")}`);
  } else if (["dm", "dm-at"].includes(args[0])) {
    msg.guild.members.cache.filter(u => {
      return (
        u.roles.cache.some(r => cfg.roles.yetkiliRoller.includes(r.id)) && !u.voice.channel && u.presence.status !== "offline"
      );
    }).forEach(uye => {
      var text = "Merhabalar sunucumuzun ses aktifliğini arttırmak için lütfen müsait isen public odalara değil isen alone odalarına geçer misin?";
      uye.send(text).catch(err => {
        msg.channel.send(`${uye} adlı üyeye dmden mesaj atamıyorum. Müsait isen public odalara değil isen alone odalarına geçiş yapabilirsin.`);
      });
    });
  };
};

module.exports.help = {
  name: "ytsay",
  alias: ["ysay"]
};

module.exports.operate = async ({client, msg, args, author, uye, cfg, db}) => {
  if (!author.roles.cache.get(cfg.roles.botc) && !author.permissions.has("MANAGE_ROLES")) return;
  var kullanici = author || uye;
  
  const erkek = db.get(`teyit.${kullanici.id}.erkek`) || 0;
  const kız = db.get(`teyit.${kullanici.id}.kiz`) || 0;
  const jail = db.get(`jailAtma_${kullanici.id}`) || 0;
  const mute = db.get(`muteAtma_${kullanici.id}`) || 0;
  const ban = db.get(`banAtma_${kullanici.id}`) || 0;
  let toplam = erkek + kız;
  msg.channel.send({
    embed: { 
      author: {
        name: msg.guild.name,
        icon_url:msg.guild.iconURL({dynamic:true})
      },
      description: `${kullanici} - (\`${kullanici.id}\`) **adlı üyenin yetkili durumu:**\n\n**Kayıt Edilen Erkek Sayısı: ${client.emojili(erkek)}\nKayıt Edilen Kız Sayısı: ${client.emojili(kız)}\nToplam Kayıt Sayısı: ${client.emojili(toplam)}\nAtılan Ban Sayısı: ${client.emojili(ban)}\n\Atılan Mute Sayısı: ${client.emojili(mute)}\nAtılan Jail Sayısı: ${client.emojili(jail)}**`,
      color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],
      timestamp: new Date()
    }
  });
};

module.exports.help = {
  name: "ytbilgi",
  alias: ["ybilgi"]
};

module.exports.operate = async ({client, msg, args, cfg, author}) => {
  if (!author.hasPermission("ADMINISTRATOR")) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(x => x.delete({timeout: 5000}));
  function ortalama(array) {
    if(array.length <= 0) return 0;
    const average = list => list.reduce((prev, curr) => prev + curr) / list.length;
    return Math.floor(average(array));
  };
  let members = msg.guild.members.cache;
  let genel = members.filter(member => member.nickname && member.nickname.includes('|') && !isNaN(member.nickname.split('| ')[1])).map(member => Number(member.nickname.split('| ')[1]));
  let erkek = members.filter(member => cfg.roles.erkek.some(rol => member.roles.cache.has(rol)) && member.nickname && member.nickname.includes('|') && !isNaN(member.nickname.split('| ')[1] || "")).map(member => Number(member.nickname.split('| ')[1]));
  let kiz = members.filter(member => cfg.roles.kız.some(rol => member.roles.cache.has(rol)) && member.nickname && member.nickname.includes('|') && !isNaN(member.nickname.split('| ')[1] || "")).map(member => Number(member.nickname.split('| ')[1]));
  let tagli = members.filter(member => member.roles.cache.has(cfg.tagrol) && member.nickname && member.nickname.includes('|') && !isNaN(member.nickname.split('| ')[1] || "")).map(member => Number(member.nickname.split('| ')[1]));
  let ses = members.filter(member => member.voice.channel && member.nickname && member.nickname.includes('|') && !isNaN(member.nickname.split('| ')[1] || "")).map(member => Number(member.nickname.split('| ')[1]));
  msg.channel.send({
   embed: { 
     description: `\`Sunucu Yaş Ortalaması:\` ${client.emojili(`${ortalama(genel)}`)}\n\`Erkek:\` ${client.emojili(`${ortalama(erkek)}`)}\n\`Kız:\` ${client.emojili(`${ortalama(kiz)}`)}\n\`Ekip:\` ${client.emojili(`${ortalama(tagli)}`)}\n\`Ses:\` ${client.emojili(`${ortalama(ses)}`)}`, 
     color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],
     timestamp: new Date(), 
     author: { name: msg.guild.name, icon_url: msg.guild.iconURL({dynamic:true})}
   } 
  });
};

module.exports.help = {
  name: "yaş-ortalaması",
  alias: ["yaşortalaması", "yas-ortalamasi", "yasortalamasi"]
};

module.exports.operate = ({author, msg, args}) => {
  if (!author.permissions.has("ADMINISTRATOR")) return;
  let yazi = args.join(" ");
  if (!yazi) return;
  msg.delete();
  msg.channel.send(yazi, { disableMentions: "everyone" });
};

module.exports.help = {
  name: "yaz",
  alias: ["y"]
};

module.exports.operate = async ({client, msg, author, args, db, cfg}) => {
  if (!cfg.sahipler.includes(author.id)) return;
  const type = args[0].toLowerCase();
  const evet = "✅";
  const hayir = "❌";
  if (type === "rol-ekle") {
    const rol = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[1]);
    function onlarFilterBenBeko(r, u) { return [evet, hayir].includes(r.emoji.name) && u.id === msg.author.id };
    if (!rol) return msg.channel.send("**Bir rol etiketlemeli veya idsini girmelisin.**").then(m => m.delete({ timeout: 5000 }));
    if (db.get(`yasakliTagRol_${msg.guild.id}`)) {
      msg.channel.send({embed: { description: `Yasaklı tag komutu için zaten bir role sahipsin. Onaylıyorsan kayıtlı rol yerine ${rol} rolünü yasaklı taga koyacağım.`,timestamp: new Date(),color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)]}}).then(async (m) => {
        await m.react(evet);
        await m.react(hayir);
        m.awaitReactions(onlarFilterBenBeko, { max: 1 }).then(async collected => {
          let cvp = collected.first();
          if (cvp.emoji.name === evet) {
            await db.set(`yasakliTagRol_${msg.guild.id}`, rol.id);
            await m.delete();
            await msg.channel.send({embed: {description: `Başarıyla yeni yasaklı tag rolünü ${rol} olarak ayarladım.`,timestamp: new Date(),color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)]}}).then(msj => msj.delete({ timeout: 5000 }));
          } else {
             await m.delete();
             await msg.channel.send("**Komut iptal edildi.**").then(m => m.delete({ timeout: 5000 }));
          };
        });
      });
    } else {
      await db.set(`yasakliTagRol_${msg.guild.id}`, rol.id);
      msg.channel.send({embed: { description: `Başarıyla yeni yasaklı tag rolünü ${rol} olarak ayarladım.`,timestamp: new Date(),color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)]}});
    };
  } else if (type === "rol-sil") {
    if (db.get(`yasakliTagRol_${msg.guild.id}`)) {
      await db.delete(`yasakliTagRol_${msg.guild.id}`);
      await msg.channel.send("**Başarıyla yasaklı tag rolü silindi.**").then(m => m.delete({ timeout: 5000 }));
    } else {
      await msg.channel.send("**Silinecek bir rol yok.**").then(m => m.delete({ timeout: 5000 }));
    };
  } else if (type === "tag-ekle") {
    let taglar = args.slice(1).join("").split("");
    if (db.get(`yasakliTag_${msg.guild.id}`)) {
      var arr = [];
      await taglar.forEach(async x => {
        if (await db.get(`yasakliTag_${msg.guild.id}`).includes(x)) return msg.channel.send(x + " tagı zaten yasaklıda.");
        await db.push(`yasakliTag_${msg.guild.id}`, x);
        arr.push(x);
      });
      msg.channel.send(client.nrmlembed(`**Başarıyla** \`\`[${arr.join(" , ")}]\`\` **tag(lar)ı yasaklı taga atıldı.**\n\n__**Şuan Yasaklıda Olan Taglar: **__(\`${db.get(`yasakliTag_${msg.guild.id}`).join(", ")}\`)`));
    } else {
      var arr = [];
      await taglar.forEach(x => arr.push(x));
      await db.set(`yasakliTag_${msg.guild.id}`, arr);
      msg.channel.send(client.nrmlembed(`**Başarıyla** \`\`[${arr.join(" , ")}]\`\` **tag(lar)ı yasaklı taga atıldı.**`));
    };
  } else if (type === "tag-sil") {
    if (!db.get(`yasakliTag_${msg.guild.id}`)) return msg.channel.send("**Silinecek bir yasaklı tag bulunmamakta !**").then(m => m.delete({ timeout: 5000 }));
    let arr = db.get(`yasakliTag_${msg.guild.id}`);
    let taglar = args[1];
    db.set(`yasakliTag_${msg.guild.id}`, arr.filter(a => a !== taglar));
    msg.channel.send(client.nrmlembed(`**Başarıyla** \`\`[${taglar}]\`\` **tagı yasaklı tagdan çıkarıldı.**\n\n__**Şuan Yasaklıda Olan Taglar: **__(\`${db.get(`yasakliTag_${msg.guild.id}`).join(", ") || "Yasaklı Tag Yok !"}\`)`));
  } else if (type === "tüm-tagları-sil") {
    if (!db.get(`yasakliTag_${msg.guild.id}`)) return msg.channel.send("**Silinecek bir yasaklı tag bulunmamakta !**").then(m => m.delete({ timeout: 5000 }));
    await db.delete(`yasakliTag_${msg.guild.id}`);
    await msg.channel.send("**Tüm yasaklı taglar silindi.**").then(m => m.delete({ timeout: 5000 }));
  } else if (type === "görüntüle") {
    let kontrol = db.get(`yasakliTagKontrol_${msg.guild.id}`) || "kapali";
    let taglar = db.get(`yasakliTag_${msg.guild.id}`) || [];
    let rol = db.get(`yasakliTagRol_${msg.guild.id}`) || "";
    await msg.channel.send({embed: {author: { icon_url: msg.guild.iconURL({dynamic:true}), name: msg.guild.name },description: `**Sunucudaki Yasaklı Taglar:** \`${taglar.join(", ") || "Yasaklı Tag Yok !"}\` \n**Yasaklı Tag Rolü:** \`${rol || "Yasakli Tag Rolü Yok !"}\`\n**Yasaklı Tag Sistemi: **\`${kontrol === "acik" ? "Açık" : "Kapalı"}\` `,timestamp: new Date(),color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)]}});
  } else if (type === "tüm-sistemi-sil") {
    await db.delete(`yasakliTag_${msg.guild.id}`);
    await db.delete(`yasakliTagRol_${msg.guild.id}`);
    await db.set(`yasakliTagKontrol_${msg.guild.id}`, "kapali");
    await msg.channel.send({embed:{description:`**Yasaklı Tag Sistemi Tamamiyle Silinmiştir.**`, color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)], timestamp: new Date()}});
  } else if (type === "kontrol") {
    let kontrol = db.get(`yasakliTagKontrol_${msg.guild.id}`) || "kapali";
    let type2 = args[1].toLowerCase();
    if (["aç", "ac"].includes(type2)) {
      function BekoAslındaFilter(r, u) { return [evet, hayir].includes(r.emoji.name) && u.id === msg.author.id };
      if (kontrol === "acik") return msg.channel.send("**Yasaklı tag sistemi zaten açık.**").then(m => m.delete({ timeout: 5000 }));
      msg.channel.send({embed:{description:`**Yasaklı tag sistemini açmak istediğine emin misin?**\n\n\`Bu sistem açıldığıktan yasaklı taga düşecek taglar: ${db.get(`yasakliTag_${msg.guild.id}`).join(", ") || "Yasaklı Tag Yok !"}\``, timestamp: new Date(), color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)]}}).then(async m => {
        await m.react(evet);
        await m.react(hayir);
        m.awaitReactions(BekoAslındaFilter, { max: 1 }).then(async collected => {
          let cvp = collected.first();
          if (cvp.emoji.name === evet) {
            await m.delete();
            await db.set(`yasakliTagKontrol_${msg.guild.id}`, "acik");
            await msg.channel.send({embed:{description:`**Yasaklı tag sistemi başarıyla açıldı.**`, color:Math.floor(Math.random() * (0xFFFFFF+ 1)), timestamp:new Date()}}).then(message => message.delete({ timeout: 5000 }));
          } else {
            await m.delete().catch();
            await msg.channel.send({embed:{description:`**Komut başarıyla iptal edildi.**`, color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)]}}).then(message => message.delete({timeout:5000}));
          };
        });
      });
    } else if (["kapa", "kapat"].includes(type2)) {
      function BekoAslındaFilter(r, u) { return [evet, hayir].includes(r.emoji.name) && u.id === msg.author.id };
      if (kontrol === "kapali") return msg.channel.send("**Yasaklı tag sistemi zaten kapalı.**").then(m => m.delete({ timeout: 5000 }));
      await msg.channel.send({embed:{description:`**Yasaklı tag sistemini kapatmak istediğine emin misin?**`, color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)], timestamp:new Date()}}).then(async m => {
        await m.react(evet);
        await m.react(hayir);
        m.awaitReactions(BekoAslındaFilter, { max: 1 }).then(async collected => {
          var cvp = collected.first();
          if (cvp.emoji.name === evet) {
            await m.delete();
            await db.set(`yasakliTagKontrol_${msg.guild.id}`, "kapali");
            await msg.channel.send({embed:{description:`**Yasaklı tag sistemi başarıyla kapatıldı.**`, color:Math.floor(Math.random() * (0xFFFFFF+ 1)), timestamp:new Date()}}).then(msj => msj.delete({ timeout: 5000 }));
          } else {
            await m.delete().catch();
            await msg.channel.send({embed:{description:`**Komut başarıyla iptal edildi.**`, color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)]}}).then(msj => msj.delete({timeout:5000}));
          };
        });
      });
    };
  } else if (type === "yardım") {
    await msg.channel.send(
      client.nrmlembed(
        `__**Yasaklı Tag Komutları:**__\n\n \`• yasaklıtag tag-ekle\n• yasaklıtag tag-sil\n• yasaklıtag tüm-tagları-sil\n• yasaklıtag rol-ekle\n• yasaklıtag rol-sil\n• yasaklıtag görüntüle\n• yasaklıtag tüm-sistemi-sil\n• yasaklıtag kontrol aç-kapa\``
      )
    );
  };
};

module.exports.help = {
  name: "yasaklıtag",
  alias: []
};

module.exports.operate = ({client, author, msg, args, uye}, fs = require("fs")) => {
  if (!author.permissions.has("ADMINISTRATOR")) return;
  if (!args[1]) {
    if (!uye) return msg.channel.send("**Bir üye etiketlemelisin**").then(a => a.delete({ timeout: 5000 }));
    let index = JSON.parse(fs.readFileSync("./uyarilar.json", "utf8"));
    if (!index[uye.id]) return msg.channel.send("Etiketlediğin üyenin uyarısı bulunmamakta.");
    let uyarisayi = index[uye.id].sayı;
    let uyarilar = index[uye.id].uyarılar;
    msg.channel.send(
      `**Bu kişinin ${uyarisayi} adet uyarısı bulunuyor. İşte listesi;**\n\`\`\`ID | Uyarı Sebep | Uyarı Atan Yetkili | Uyarı Tarihi \n─────────────────────────────────────────────────────────────────────\n${uyarilar.join(
        "\n──────────────────────────────────────────────────────────────────\n"
      )}\`\`\``
    );
  } else {
      if (!uye) return msg.channel.send("**Bir üye etiketlemelisin**").then(a => a.delete({ timeout: 5000 })); 
      let index = JSON.parse(fs.readFileSync("./uyarilar.json", "utf8"));
      if (!index[uye.id]) return msg.channel.send("Bu üyenin uyarısı yok");
      let sayı = index[uye.id].sayı;
      let uyarılar = index[uye.id].uyarılar;
      let bul = uyarılar.filter(a => a.includes(`#${args[1]}`));
      if (!bul) return msg.channel.send("Bu id de uyarı yok");
      msg.channel.send(`\`\`\`${bul}\`\`\``);
    };
};

module.exports.help = {
  name: "uyarılar",
  alias: []
};

module.exports.operate = async ({client, msg, args, author, uye, cfg}) => {
  if (!author.permissions.has("MANAGE_ROLES")) return;
  if (uye.roles.cache.get(cfg.roles.botc) || uye.roles.cache.get(cfg.roles.booster) || uye.permissions.has("MANAGE_ROLES")) return msg.channel.send("**Bir yetkiliyi veya boosteri unregistere atamazsın.**").then(m => m.delete({ timeout: 5000 }));
  if (author.roles.highest.position <= uye.roles.highest.position) return msg.channel.send("**Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!**").then(x => x.delete({timeout: 5000}));
  await uye.roles.set([cfg.roles.unregister]);
  await msg.channel.send(client.nrmlembed(`${uye}** adlı üye başarıyla kayıtsıza atıldı.**`)).then(msj => msj.delete({ timeout: 2000 }));
};

module.exports.help = {
  name: "unreg",
  alias: ["unregister"]
};

const moment = require("moment");
const tarih = moment(Date.parse(new Date().toLocaleString("tr-TR", {timeZone:"Europe/Istanbul"}))).format("LLL");

module.exports.operate = async ({msg, author, uye, args}, fs = require("fs")) => {
  if (!author.permissions.has("ADMINISTRATOR")) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(msg => msg.delete({ timeout: 5000 }));
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(msg => msg.delete({ timeout: 5000 }));
  let sebep = args[1] ? args.slice(1).join(" ") : "Sebep Girilmedi.";
  let uyarıArr = [];
  let sayıs = 0;
  let index = JSON.parse(fs.readFileSync("./uyarilar.json", "utf8"));
  if (!index[uye.id]) { uyarıArr = []; sayıs = 0; } else { uyarıArr = index[uye.id].uyarılar; sayıs = index[uye.id].sayı; };
  uyarıArr.push(`#${sayıs + 1}  | Sebep: ${sebep} | Yetkili: ${author.user.tag} | Tarih: ${tarih}`);
  index[uye.id] = { sayı: sayıs + 1, uyarılar: uyarıArr };
  let uyariSayisi = sayıs + 1;
  fs.writeFile("./uyarilar.json", JSON.stringify(index, null, 4), function(err) {
    if (err) console.log(err);
      msg.channel.send(
        "<@" +
        uye +
        "> kişisi <@" +
        msg.author +
        "> yetkilisi tarafından uyarıldı.\n────────────────────────────────────\nUyarı Sebebi: **" +
        sebep +
        "**\nUyarı Tarihi: **" +
        tarih +
        "**\nUyarı Sayısı: **" +
        uyariSayisi +
        "** "
      );
  });
};

module.exports.help = {
  name: "uyar",
  alias: ["uyarı"]
};

module.exports.operate = async ({client, msg, uye, author, cfg}) => {
  const muteAtan = cfg.roles.yetkiliRoller.muteHammer;
  let muteLog = msg.guild.channels.cache.find(c => c.name === "mute-log");
  if (!author.roles.cache.get(muteAtan) && !author.permissions.has("MANAGE_ROLES")) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }))
  if (!uye) return msg.channel.send('**Bir üye etiketlemelisin**').then(m => m.delete({ timeout: 5000 }));
  if (uye.roles.cache.get(cfg.roles.ceza.muted)) {
    await uye.roles.remove(cfg.roles.ceza.muted).catch();
    await muteLog.send({ embed: { description: `${uye} adlı üyenin mutesi ${author} tarafından kaldırıldı.` , color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)], timestamp: new Date() }});
  } else {
    msg.channel.send("**Bu üye zaten muteli değil.**").then(i => i.delete({ timeout: 5000 }));
  };
};

module.exports.help = {
  name: "unmute",
  alias: [],
  description: ""
};

module.exports.operate = async ({client, msg, args, author}) => {
  let banLog = msg.guild.channels.cache.find(c => c.name === "ban-log");
  if (!author.permissions.has("BAN_MEMBERS")) return msg.channel.send("**Gerekli yetkiye sahip değilsiniz.**").then(m => m.delete({ timeout: 5000 }));
  if (!args[0] || isNaN(args[0])) return msg.channel.send("**Geçerli bir id girmelisiniz.**").then(m => m.delete({ timeout: 5000 }));
  let user = client.users.fetch(args[0]);
  if (user) {
    let reason = args.slice(1).join(" ") || "Sebep Girilmedi";
    msg.guild.members.unban(user.id).catch(err => {
      msg.channel.send({ embed: { description: "**Belirtilen ID'de bir yasaklama bulunamadı.**", color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)], timestamp: new Date()}}).then(m => m
      .delete({ timeout: 3000 }));
    });
    banLog.send(client.nrmlembed(`${user.id} ID'li üyenin yasaklaması ${author} tarafından kaldırıldı.`));
  } else {
    msg.channel.send("**Geçerli bir kişi ID'si belirtmelisin.**").then(m => m.delete({ timeout: 4000 }));
  };
};

exports.help = {
  name: "unban",
  alias: ["ub", "af"],
  description: "Sunucudan ban kaldırmanızı sağlar.",
};

module.exports.operate = async ({client, msg, args, cfg, db}) => {
  let data = db.get("teyit") || {};
  var arr = Object.keys(data);
  var sayi = args[0] || 10;
  let list = arr.filter(a => msg.guild.members.cache.get(a)).sort((a, b) => {
    Number((data[b].erkek || 0) + (data[b].kiz || 0)) - Number((data[a].erkek || 0) + (data[a].kiz || 0))
  }).map((value, i) => `\`${i + 1}.\` ${msg.guild.members.cache.get(value)} | \`${(data[value].erkek || 0) + (data[value].kiz || 0)} teyit\``).slice(0, sayi);
  
  msg.channel.send({
    embed: {
      author: { name: msg.guild.name, icon_url: msg.guild.iconURL({dynamic:true}) },
      description: `**En çok teyit yapan \`${sayi}\` kişi:**\n\n${list.join("\n") || "Yok !"}`,
      color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],
      timestamp: new Date()
    }
  }).catch();
};

module.exports.help = {
  name: "topteyit",
  alias: ["tt"]
};

module.exports.operate = async ({client, msg, args, author, cfg}) => {
  const evet = "✅";
  const hayir = "❌";
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
    let tip2 = args[1];
    if (["dağıt", "ver"].includes(tip2)) {
      function onlarFilterBenBeko(r, u) { return [evet, hayir].includes(r.emoji.name) && u.id === author.id };
      var katildi = msg.guild.roles.cache.get(args[2]) || msg.mentions.roles.first();
      if (!katildi) return msg.channel.send("**Komut kullanımı:**`.toplantı katıldı (dağıt\ver) (<@rol>\rolid)`").then(msj => msj.delete({ timeout: 5000 }));
      var ytler = yetkililer.filter(yetkili => yetkili.voice.channel && msg.guild.members.cache.get(yetkili.id).voice.channel.id === author.voice.channel.id);
      if (ytler.size === 0) return msg.channel.send("**Seste yetki verilecek yetkili bulunmuyor.**").then(msj => msj.delete({ timeout: 5000 }));
      msg.channel.send({embed:{description:` \`${author.voice.channel.name}\` adlı kanaldaki herkese katıldı permini vermek istiyor musun?`, color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)], timestamp: new Date()}}).then(async msj => {
        await msj.react(evet);
        await msj.react(hayir);
        msj.awaitReactions(onlarFilterBenBeko, { max: 1, time: client.getDate(15, "saniye"), errors:["time"]}).then(async collected => {
          let cvp = collected.first();
          if (cvp.emoji.name === evet) {
            await msj.delete();
            await msg.delete();
            await msg.channel.send(`**Başarıyla \`${ytler.size}\` kişiye katıldı permi dağıtıyorum.**`).catch(err => msg.channel.send(err.message));
            ytler.map(y => y.roles.add(katildi.id));
          } else {
            await msj.delete().catch();
            await msg.delete().catch();
            msg.channel.send(`**Komut başarıyla iptal edildi.**`).then(msj => msj.delete({ timeout: 5000 }));
          };
        }).catch(err => [msj.delete(), msg.delete()]);;
      });
    } else if (["al", "topla"].includes(tip2)) {
      function onlarFilterBenBeko(r, u) { return [evet, hayir].includes(r.emoji.name) && u.id === author.id };
      var katildi = msg.guild.roles.cache.get(args[2]) || msg.mentions.roles.first();
      if (!katildi) return msg.channel.send("**Komut kullanımı:**`.toplantı katıldı (al\topla) (<@rol>\rolid)`").then(msj => msj.delete({ timeout: 5000 }));
      var ytler = msg.guild.members.cache.filter(u => u.roles.cache.get(katildi.id));
      if (ytler.size === 0) return msg.channel.send("**Katıldı rolüne sahip üye bulunmuyor..**").then(msj => msj.delete({ timeout: 5000 }));
      msg.channel.send({embed:{description:`Katıldı permine sahip tüm üyelerden  katıldı permini almak istiyor musun?`, color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)], timestamp: new Date()}}).then(async msj => {
        await msj.react(evet);
        await msj.react(hayir);
        msj.awaitReactions(onlarFilterBenBeko, { max: 1, time: client.getDate(15, "saniye"), errors:["time"]}).then(async collected => {
          let cvp = collected.first();
          if (cvp.emoji.name === evet) {
            await msj.delete();
            await msg.delete();
            await msg.channel.send(`**Başarıyla \`${ytler.size}\` kişiden katıldı permini alıyorum.**`).catch(err => msg.channel.send(err.message));
            ytler.map(y => y.roles.remove(katildi.id));
          } else {
            await msj.delete().catch();
            await msg.delete().catch();
            msg.channel.send(`**Komut başarıyla iptal edildi.**`).then(msj => msj.delete({ timeout: 5000 }));
          };
        }).catch(err => [msj.delete(), msg.delete()]);;
      });
    };
  } else return msg.channel.send("**Komut kullanımı yanlış.**").then(msj => msj.delete({ timeout: 5000 }));
};

module.exports.help = {
  name: "toplantı",
  alias: ["toplanti"]
};

const ms = require("ms");
module.exports.operate = async ({client, msg, args, author, uye, cfg, db}) => {
  const evet = "✅";
  const hayir = "❌";
  if (!author.permissions.has("MANAGE_ROLES") && !author.roles.cache.get(cfg.roles.jailH)) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({timeout: 5000}));
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(m => m.delete({ timeout: 5000 }));
  if (author.roles.highest.position <= uye.roles.highest.position) return msg.channel.send("**Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!**").then(x => x.delete({timeout: 5000}));
  const zaman = args[1];
  const reason = args.slice(2).join(" ") || "Sebep Girilmedi.";
  if (!ms(zaman) || !zaman) return msg.channel.send("**Geçerli bir süre girmelisin.**").then(m => m.delete({ timeout: 5000 }));
  const sicil = db.get(`sicil_${uye.id}`);
  if (!uye.roles.cache.get(cfg.roles.jail)) {
    if (!sicil) db.set(`sicil_${uye.id}`, []);
    if (!db.get(`tempj_${msg.guild.id}`)) db.set(`tempj_${msg.guild.id}`, []);
    await uye.roles.set(uye.roles.cache.has(cfg.roles.booster) ? [cfg.roles.jail, cfg.roles.booster] : [cfg.roles.jail]).catch();
    await msg.channel.send(client.nrmlembed(`${uye} adlı üye ${author} tarafından **${reason}** sebebiyle jaile atıldı.`)).then(m => m.delete({ timeout: 5000})).catch();
    await db.push(`sicil_${uye.id}`, { yetkili: author.id, tip: "tempjail", sebep: reason, zaman: Date.now() });
    await db.add(`jailAtma_${author.id}`, 1);
    await db.push(`tempj_${msg.guild.id}`, { id: uye.id, kalkmaZamani: Date.now() + ms(zaman) });
    if (uye.voice.channel) uye.voice.kick().catch();
  } else {
    function GaripBirAdamımEvet(r, u) { return [evet, hayir].includes(r.emoji.name) && u.id === author.id };
    await msg.channel.send({embed:{author:{icon_url: msg.guild.iconURL({dynamic:true}),name:msg.guild.name},description:`**${uye} adlı üye zaten jailde. Eğer işlemi onaylarsan üyeyi jailden çıkartacağım.**`, timestamp:new Date(),color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)]}}).then(async m => {
      await m.react(evet);
      await m.react(hayir);
      m.awaitReactions(GaripBirAdamımEvet,{max:1,time:client.getDate(20, "saniye"),errors:["time"]}).then(async collected => {
        let cvp = collected.first();
        if (cvp.emoji.name === evet) {
          await uye.roles.remove(cfg.roles.jail).catch();
          await uye.roles.add(cfg.roles.unregister).catch();
          await msg.channel.send(client.nrmlembed(`**${uye} adlı üye başarıyla jailden çıkarıldı.**`)).catch();
          await m.delete().catch();
          await msg.delete().catch();
        } else {
          m.delete();
          msg.delete();
          msg.channel.send(client.nrmlembed(`**Komut başarıyla iptal edildi.**`)).then(m => m.delete({ timeout: 5000 }));
        };
      }).catch(err => [m.delete(), msg.delete()]);
    });
  };

};

module.exports.help = {
  name: "tempjail",
  alias: ["tjail", "temp-jail"]
};

module.exports.operate = async ({client, msg, author, cfg, db}) => {
  if (!author.roles.cache.get(cfg.roles.botc) && !author.permissions.has("MANAGE_ROLES")) return;
  let data = db.get(`snipe_${msg.guild.id}`) || { author: "Yok", content: "Yok", kanal: "Yok" };
  let a = data.author;
  let content = data.content;
  let channel = data.kanal;
  msg.channel.send({embed:{color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],timestamp:new Date(),description:`**En Son Silinen Mesaj Bilgileri:**\n\n\`Mesajı Atan Kişi:\` <@${a}> - **(${a})**\n\`Silindiği Kanal:\` <#${channel}> - **(${channel})**\n\`Mesajın İçeriği:\` **${content}**`}})
};

module.exports.help = {
  name: "snipe",
  alias: []
};

module.exports.operate = async ({client, msg, args, author}) => {
  if (!author.permissions.has("MANAGE_MESSAGES")) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({timeout: 5000}));
  let silinecek = Number(args[0]);
  if (!silinecek) return [msg.delete(), msg.channel.send("**Bir sayı girmelisin.**").then(msj => msj.delete({ timeout: 3000 }))];
  await msg.channel.bulkDelete(silinecek).catch(err => console.log(err.message));
  await msg.channel.send("**Başarıyla " + silinecek + " adet mesaj silindi.**").then(msj => msj.delete({ timeout: 3000 }));
};

module.exports.help = {
  name: "sil",
  alias: ["clear"]
};

module.exports.operate = async ({client, msg, args, db}) => {
  const ayar = args[1];
  if (!ayar) {
    const kisi = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(args[0]) || msg.guild.member(msg.author);
    let sicil = db.get(`sicil_${kisi.id}`) || [];
    let liste = sicil.length > 0 ? sicil.map((value, index) => `\`${index + 1}.\` **[${value.tip.toUpperCase()}]** ${client.toDate(value.zaman)} tarihinde **${value.sebep}** sebebi ile ${msg.guild.members.cache.has(value.yetkili) ? msg.guild.members.cache.get(value.yetkili) : value.yetkili} tarafından atıldı.`).join("\n") : "**Temiz!**";
    msg.channel.send({embed:{author:{name: msg.guild.name,icon_url:msg.guild.iconURL({dynamic:true})},description:`**${kisi} (\`${kisi.id}\`) adlı üyenin sicil bilgisi.**\n\n${liste}`, color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],timestamp:new Date()}});
  } else if (ayar === "temizle") {
    const kisi = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(args[1]) || msg.guild.member(msg.author);
    let sicil = db.get(`sicil_${kisi.id}`) || [];
    if (sicil.length > 0) {
      await db.delete(`sicil_${kisi.id}`);
      await msg.channel.send({embed:{timestamp:new Date(),color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],description:`**${kisi} adlı üyenin sicili temizlendi.**`}}).then(msj => msj.delete({timeout: 5000}));
    } else {
      await msg.channel.send({embed:{timestamp:new Date(),color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],description:`**${kisi} adlı üyenin sicili zaten temiz.**`}}).then(msj => msj.delete({timeout: 5000}));
    };
  };
};



module.exports.help = {
  name: "sicil",
  alias: []
};

module.exports.operate = ({msg, author, client}) => {
  if (!author.permissions.has("MANAGE_ROLES")) return;
  let sesli = 0;
  msg.guild.channels.cache.filter(c => c.type === "voice").map(k => {
    sesli += k.members.size
  });
  msg.channel.send(client.duzembed(`Seste **${sesli}** kullanıcı bulunmakta`)).then(m => m.delete({ timeout: 5000 }));
};

module.exports.help = {
  name: "sesli",
  alias: ["ses"]
};

module.exports.operate = ({client, msg, args, author, uye}) => {
  
  if (!author.permissions.has("ADMINISTRATOR")) return;
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**");
  
  if (!uye.voice.channel) {
  msg.channel.send(client.nrmlembed(`**${uye} adlı üye herhangi bir ses kanalında bulunmuyor.**`)).then(m => m.delete({ timeout: 7000 }));
  } else { 
    msg.channel.send(client.nrmlembed(`${uye} adlı üyenin bulunduğu sesli kanal: ${uye.voice.channel}\nKulaklık Durumu: **${uye.voice.selfDeaf ? "Kulaklığı Kapalı" : "Kulaklığı Açık"}**\nMikrofon Durumu: **${uye.voice.selfMute ? "Mikrofonu Kapalı" : "Mikrofunu Açık"}**`)).then(m => m.delete({ timeout: 3000 }));
  };
};

module.exports.help = {
  name: "seskontrol",
  alias: ["skontrol", "kanalkontrol"],
  description: ""
};

module.exports.operate = async ({msg, author, args, client, cfg, db}) => {
  if (!author.permissions.has("MANAGE_ROLES")) return;
  let sayi = 0;
  const sayTürü = db.get(`sayTuru_${msg.guild.id}`) || "emojisiz";
  const uyeSayisi = msg.guild.memberCount;
  const tagliUye = msg.guild.members.cache.filter(u => u.user.username.includes(cfg.tag.taglıTag)).size || 0;
  const onlineUye = msg.guild.members.cache.filter(u => u.presence.status !== "offline").size;
  const boosterUye = msg.guild.members.cache.filter(u => u.roles.cache.get(cfg.roles.booster)).size || 0;
  const type = args[0];
  msg.guild.channels.cache.filter(c => c.type === "voice").map(k => { 
    sayi += k.members.size
  });
  if (!type) {
    if (sayTürü === "emojisiz") {
      msg.channel.send({
        embed: {
          description: `• Sunucumuzda **Toplam** \`${
          uyeSayisi
        }\` Kullanıcı bulunmaktadır.\n• Şuan **Online** \`${
          onlineUye
        }\` Kullanıcı Bulunmaktadır.\n• **Tagımızda** \`${
          tagliUye
        }\` Kullanıcı bulunmaktadır.\n• Sunucumuzda \`${
          boosterUye
        }\` tane **booster** bulunmaktadır.\n• **Ses Kanallarında** \`${
          sayi
        }\` Kullanıcı bulunmaktadır.`,
          author: {
            icon_url: msg.guild.iconURL({dynamic:true}),
            name: msg.guild.name
          },
          color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],
          timestamp: new Date(),
          footer: {
            text: `${[client.xd[Math.floor(Math.random() * client.xd.length)]]}`
          }
        }
      }).then(m => m.delete({ timeout: 6000 }));
    } else if (sayTürü === "emojili") {
      msg.channel.send(
        `**${cfg.snc.sncIsim}: ${client.emojili(uyeSayisi)}               Online: ${client.emojili(onlineUye)}**\n\n            **${cfg.snc.tagRolIsim}: ${client.emojili(tagliUye)}**`
      ).then(m => m.delete({ timeout: 6000 }));;
    } else if (sayTürü === "emojiliEmbed") {
        msg.channel.send({
          embed: {
            author: { 
              icon_url: msg.guild.iconURL({dynamic: true}), name: msg.guild.name 
            },
            footer: {
              text: `${[client.xd[Math.floor(Math.random() * client.xd.length)]]}`
            },
            timestamp: new Date(),
            color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],
            description: `:white_small_square: **${cfg.snc.sncIsim} Ailesinin Toplam ${
              client.emojili(uyeSayisi)
            } Üyesi Bulunmakta.\n:white_small_square: Aktif ${
              client.emojili(onlineUye)
            } Kullanıcı Bulunmakta.\n:white_small_square: Tagımızı Alarak Ailemize Katılmış ${
              client.emojili(tagliUye)
            } Kişi Bulunmakta.\n:white_small_square: Sunucumuzda ${
              client.emojili(boosterUye)
            } Destekçi Bulunmakta.\n:white_small_square: Ses Kanallarında Toplam ${
              client.emojili(sayi)
            } Kişi Bulunmakta.**`
          }
        }).then(m => m.delete({ timeout: 6000 }));
      };
    } else if (type === "ayarla") {
      let ayar = args[1];
      if (!ayar) return;
      if (ayar === "emojili") {
        if (sayTürü === "emojili") return msg.channel.send("**Say türü zaten emojili.**").then(m => m.delete({ timeout: 5000 }));
        await db.set(`sayTuru_${msg.guild.id}`, "emojili");
        await msg.channel.send({embed:{author:{icon_url:msg.guild.iconURL({dynamic:true}), name: msg.guild.name},description:`**Say türü emojili olarak değiştirildi.**`, color:Math.floor(Math.random()*(0xFFFFFF+1)), timestamp:new Date()}}).then(m => m.delete({timeout:5000}));
      } else if (ayar === "emojisiz") {
        await db.set(`sayTuru_${msg.guild.id}`, "emojisiz");
        await msg.channel.send({embed:{author:{icon_url:msg.guild.iconURL({dynamic:true}), name: msg.guild.name},description:`**Say türü emojisiz olarak değiştirildi.**`, color:Math.floor(Math.random()*(0xFFFFFF+1)), timestamp:new Date()}}).then(m => m.delete({timeout:5000}));
      } else if (ayar === "emojili-embed") {
        await db.set(`sayTuru_${msg.guild.id}`, "emojiliEmbed");
        await msg.channel.send({embed:{author:{icon_url:msg.guild.iconURL({dynamic:true}), name: msg.guild.name},description:`**Say türü emojili embed olarak değiştirildi.**`, color:Math.floor(Math.random()*(0xFFFFFF+1)), timestamp:new Date()}}).then(m => m.delete({timeout:5000}));
      } else return msg.channel.send("**Say türü ayarlarken sadece**\n\n`emojili`, `emojisiz` veya `emojili-embed` olarak ayarlanabilir.").then(m => m.delete({timeout:5000}));
   };
};

module.exports.help = {
  name: "say",
  alias: []
};

module.exports.operate = async ({client, msg, args, author, uye, cfg, db}) => {
  const evet = "✅";
  const hayir = "❌";
  if (!author.roles.cache.get(cfg.roles.muteH) && !author.permissions.has("MANAGE_ROLES")) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(m => m.delete({ timeout: 5000 }));
  const zaman = args[1];
  const reason = args.slice(2).join(" ") || "Sebep Girilmedi.";
  if (!ms(zaman) || !zaman) return msg.channel.send("**Geçerli bir süre girmelisin.**").then(m => m.delete({ timeout: 5000 }));
  if (!uye.roles.cache.get(cfg.roles.muted)) {
    const sicil = db.get(`sicil_${uye.id}`);
    if (!sicil) db.set(`sicil_${uye.id}`, []);
    if (!db.get(`tempmute_${msg.guild.id}`)) db.set(`tempmute_${msg.guild.id}`, []);
    await uye.roles.add(cfg.roles.muted).catch();
    await msg.channel.send(client.nrmlembed(`${uye} adlı üye ${author} tarafından **${reason}** sebebiyle \`${zaman}\` süresince susturulmuştur. `)).then(m => m.delete({timeout: 5000})).catch();
    await db.push(`sicil_${uye.id}`, { yetkili: author.id, tip: "mute", sebep: reason, zaman: Date.now() });
    await db.push(`tempmute_${msg.guild.id}`, { id: uye.id, kalkmaZamani: Date.now() + ms(zaman) });
    db.add(`muteAtma_${author.id}`, 1);
  } else {
    function onlarFilterBenBeko(r, u) { return [evet, hayir].includes(r.emoji.name) && u.id === author.id };
    await msg.channel.send(client.nrmlembed(`**${uye} adlı üye zaten muteli. Eğer işlemi onaylarsan üyeyi mutesini kaldıracağım.**`)).then(async m => {
      await m.react(evet);
      await m.react(hayir);
      m.awaitReactions(onlarFilterBenBeko, { max: 1, time: client.getDate(10, "saniye"), errors: ["time"] }).then(async collected => {
        let cvp = collected.first();
        if (cvp.emoji.name === evet) {
          const tempmuted = db.get(`tempmute_${msg.guild.id}`) || [];
          for (let muted of tempmuted) {
            db.set(`tempmute_${msg.guild.id}`, tempmuted.filter(x => x.id !== uye.id));
            break;
          };
          await uye.roles.remove(cfg.roles.muted).catch();
          msg.channel.send(client.nrmlembed(`${uye}** adlı üyenin mutesi başarıyla kaldırıldı.**`)).then(a => a.delete({ timeout: 5000 }));
        } else {
          m.delete();
          msg.delete();
          msg.channel.send(client.nrmlembed(`**Komut başarıyla iptal edildi.**`)).then(m => m.delete({ timeout: 5000 }));
        };
      }).catch(err => [msg.delete(), m.delete()]);
    });
  };
};

module.exports.help = {
  name: "mute",
  alias: ["chatmute", "cmute", "chat-mute", "tempmute"]
};

module.exports.operate = async ({client, msg, args, author, uye, cfg, db}) => {
  if (!author.roles.cache.get(cfg.roles.botc) && !author.permissions.has("MANAGE_ROLES")) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(msj => msj.delete({timeout: 5000 }));
  const isimler = db.get(`isimler_${uye.id}`);
  const topTeyit = db.get(`topteyit_${msg.guild.id}`);
  if (!isimler) db.set(`isimler_${uye.id}`, []);
  if (!topTeyit) db.set(`topteyit_${msg.guild.id}`, [{id: author.id, sayi: 1}]);
  if (uye.roles.cache.get(cfg.roles.unregister)) {
    const nick = args.slice(1).join(" | ");
    if (!nick) return msg.channel.send("**Bir isim girmelisin.**").then(msj => msj.delete({ timeout: 5000 }));  
    const tag = uye.user.username.includes(cfg.tag.taglıTag) ? cfg.tag.taglıTag : (cfg.tag.tagsızTag === "" ? cfg.tag.taglıTag : cfg.tag.tagsızTag);
    await uye.roles.remove(cfg.roles.unregister).catch();
    await uye.roles.add(cfg.roles.kız).catch();
    await uye.setNickname(`${tag} ${nick}`).catch();
    await msg.channel.send(client.duzembed(`**${uye} adlı üyeye başarıyla <@&${cfg.roles.kız[0]}> rolü verildi.**`)).catch();
    db.push(`isimler_${uye.id}`, `\`${tag} ${nick}\` - (<@&${cfg.roles.kız[0]}>)`);
    db.add(`teyit.${author.id}.kiz`, 1);
    
  } else {
    await uye.roles.remove(cfg.roles.erkek).catch();
    await uye.roles.add(cfg.roles.kız).catch();
    await msg.channel.send(client.duzembed(`**${uye} adlı üyeye başarıyla <@&${cfg.roles.kız[0]}> rolü verildi.**`)).catch();
  };
};

module.exports.help = {
  name: "kız",
  alias: ["k"]
}; 


module.exports.operate = async ({client, msg, args, author, uye, cfg, db}) => {
  if (!author.roles.cache.get(cfg.roles.botc) && !author.permissions.has("MANAGE_ROLES")) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(msj => msj.delete({timeout: 5000 }));
  const isimler = db.get(`isimler_${uye.id}`);
  const topTeyit = db.get(`topteyit_${msg.guild.id}`);
  if (!isimler) db.set(`isimler_${uye.id}`, []);
  if (!topTeyit) db.set(`topteyit_${msg.guild.id}`, [{id: author.id, sayi: 1}]);
  if (uye.roles.cache.get(cfg.roles.unregister)) {
    const nick = args.slice(1).join(" | ");
    if (!nick) return msg.channel.send("**Bir isim girmelisin.**").then(msj => msj.delete({ timeout: 5000 }));  
    const tag = uye.user.username.includes(cfg.tag.taglıTag) ? cfg.tag.taglıTag : (cfg.tag.tagsızTag === "" ? cfg.tag.taglıTag : cfg.tag.tagsızTag);
    await uye.roles.remove(cfg.roles.unregister).catch();
    await uye.roles.add(cfg.roles.kız).catch();
    await uye.setNickname(`${tag} ${nick}`).catch();
    await msg.channel.send(client.duzembed(`**${uye} adlı üyeye başarıyla <@&${cfg.roles.kız[0]}> rolü verildi.**`)).catch();
    db.push(`isimler_${uye.id}`, `\`${tag} ${nick}\` - (<@&${cfg.roles.kız[0]}>)`);
    db.add(`teyit.${author.id}.kiz`, 1);
    
  } else {
    await uye.roles.remove(cfg.roles.erkek).catch();
    await uye.roles.add(cfg.roles.kız).catch();
    await msg.channel.send(client.duzembed(`**${uye} adlı üyeye başarıyla <@&${cfg.roles.kız[0]}> rolü verildi.**`)).catch();
  };
};

module.exports.help = {
  name: "kız",
  alias: ["k"]
}; 


module.exports.operate = async ({msg, author, client}) => {
 
  if (!author.permissions.has("ADMINISTRATOR")) return;
  if (!client.locked[msg.channel.id]) client.locked[msg.channel.id] = {
    lock: false
  };
  if (client.locked[msg.channel.id].lock === false) {
    msg.channel.send({ embed: { description: "**Kanal başarıyla kilitlendi.**", color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)], timestamp: new Date()}});
    msg.channel.updateOverwrite(msg.guild.roles.everyone, {  
      SEND_MESSAGES: false
    });   
    client.locked[msg.channel.id].lock = true;
  } else {
    msg.channel.send({ embed: { description: "**Kanalın kilidi başarıyla açıldı.**", color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)], timestamp: new Date()}});
    msg.channel.updateOverwrite(msg.guild.roles.everyone, {
      SEND_MESSAGES: null
    });
    client.locked[msg.channel.id].lock = false;
  };
};

module.exports.help = {
  name: "kanalkilit",
  alias: ["kk", "kilit", "kilitle", "lock"]
};

module.exports.operate = async ({client, msg, args, author, uye, cfg, db}) => {
  const evet = "✅";
  const hayir = "❌";
  if (!author.permissions.has("MANAGE_ROLES") && !author.roles.cache.get(cfg.roles.jailH)) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({timeout: 5000}));
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(m => m.delete({ timeout: 5000 }));
  if (author.roles.highest.position <= uye.roles.highest.position) return msg.channel.send("**Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!**").then(x => x.delete({timeout: 5000}));
  const reason = args.slice(1).join(" ") || "Sebep Girilmedi.";
  const sicil = db.get(`sicil_${uye.id}`);
  if (!uye.roles.cache.get(cfg.roles.jail)) {
    if (!sicil) db.set(`sicil_${uye.id}`, []);
    await uye.roles.set(uye.roles.cache.has(cfg.roles.booster) ? [cfg.roles.jail, cfg.roles.booster] : [cfg.roles.jail]).catch();
    await msg.channel.send(client.nrmlembed(`${uye} adlı üye ${author} tarafından **${reason}** sebebiyle jaile atıldı.`)).then(m => m.delete({ timeout: 5000})).catch();
    await db.push(`sicil_${uye.id}`, { yetkili: author.id, tip: "jail", sebep: reason, zaman: Date.now() });
    await db.add(`jailAtma_${author.id}`, 1);
    if (uye.voice.channel) uye.voice.kick().catch();
  } else {
    function GaripBirAdamımEvet(r, u) { return [evet, hayir].includes(r.emoji.name) && u.id === author.id };
    await msg.channel.send({embed:{author:{icon_url: msg.guild.iconURL({dynamic:true}),name:msg.guild.name},description:`**${uye} adlı üye zaten jailde. Eğer işlemi onaylarsan üyeyi jailden çıkartacağım.**`, timestamp:new Date(),color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)]}}).then(async m => {
      await m.react(evet);
      await m.react(hayir);
      m.awaitReactions(GaripBirAdamımEvet,{max:1,time:client.getDate(20, "saniye"),errors:["time"]}).then(async collected => {
        let cvp = collected.first();
        if (cvp.emoji.name === evet) {
          await uye.roles.remove(cfg.roles.jail).catch();
          await uye.roles.add(cfg.roles.unregister).catch();
          await msg.channel.send(client.nrmlembed(`**${uye} adlı üye başarıyla jailden çıkarıldı.**`)).catch();
          await m.delete().catch();
          await msg.delete().catch();
        } else {
          m.delete();
          msg.delete();
          msg.channel.send(client.nrmlembed(`**Komut başarıyla iptal edildi.**`)).then(m => m.delete({ timeout: 5000 }));
        };
      }).catch(err => [m.delete(), msg.delete()]);
    });
  };
};

module.exports.help = {
  name: "jail",
  alias: ["ceza"]
};

module.exports.operate = async ({client, msg, args, author, uye, cfg, db}) => {
  if (!author.roles.cache.get(cfg.roles.botc) && !author.permissions.has("MANAGE_ROLES")) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(m => m.delete({ timeout: 5000 }));
  const isimler = db.get(`isimler_${uye.id}`) || ["Kayıtlı isim yok !"];
  var arr = [];
  for (var i = 0; i < isimler.length; i++) {
    arr.push(`\`${i + 1}.\` ${isimler[i]}`);
  };
  msg.channel.send({embed:{author:{name: msg.guild.name, icon_url:msg.guild.iconURL({dynamic:true})},description:arr.join("\n"), color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)], timestamp:new Date()}});
};

module.exports.help = {
  name: "isimler",
  alias: ["kayıtlar"]
};

module.exports.operate = async ({client, msg, args, author, uye, cfg}) => {
  if (!author.permissions.has("MANAGE_NICKNAMES") && !author.roles.cache.get(cfg.roles.botc)) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(msj => msj.delete({timeout: 5000 }));
  let isim = args.slice(1).join(" | ");
  if (!isim) return msg.channel.send("**Bir isim girmelisin.**").then(msj => msj.delete({ timeout: 5000 }));
  let tag = uye.user.username.includes(cfg.tag.taglıTag) ? cfg.tag.taglıTag : (cfg.tag.tagsızTag === "" ? cfg.tag.taglıTag : cfg.tag.taglıTag);
  
  await uye.setNickname(`${tag} ${isim}`).catch(err => msg.channel.send(err.message));
  await msg.channel.send(client.duzembed(`**İstediğin kullanıcı adı başarıyla ayarlandı.**`)).then(msj => msj.delete({ timeout: 5000 }));
};

module.exports.help = {
  name: "isim",
  alias: ["i", "nick"]
};

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
    msj.awaitReactions(onlarFilterBenBeko, { max: 1, time: client.getDate(15, "saniye"), errors:["time"] }).then(async collected => {
      let cvp = collected.first();
      if (cvp.emoji.id === evet) {
        await author.voice.setChannel(uye.voice.channel.id);
        await author.send("Başarıyla <@" + uye + "> adlı üyenin odasına gittin.")
          .catch(err => msg.channel.send(client.nrmlembed(`${author} adlı üye başarıyla ${uye} adlı üyenin odasına taşındı.`)).then(m => m.delete({ timeout: 3000 })));
      } else {
        await msj.delete();
        await author.send("<@" + uye + "> adlı üye kanala gitme isteğinizi reddetti.").catch();
      };
    });
  });
};

module.exports.help = {
  name: "git",
  alias: []
};

module.exports.operate = async ({ client, msg, args, author, cfg }) => {
  if (!cfg.sahipler.includes(author.id))
  if (!args[0] || args[0].includes("qwe")) return;
  const code = args.join(" ");
  try {
    var evaled = client.clean(await eval(code));
    if (evaled.match(new RegExp(`${client.token}`, "g")))
    evaled.replace("token", "xd").replace(client.token, "xd");
    msg.channel.send(`${evaled.replace(client.token, "xd")}`, {
      code: "js",
      split: true 
    });
  } catch (err) {
    msg.channel.send(err, { code: "js", split: true });
  };
};
module.exports.help = {
  name: "eval",
  alias: []
};

module.exports.operate = async ({client, msg, args, author, uye, cfg, db}) => {
  if (!author.roles.cache.get(cfg.roles.botc) && !author.permissions.has("MANAGE_ROLES")) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(msj => msj.delete({timeout: 5000 }));
  const isimler = db.get(`isimler_${uye.id}`);
  const topTeyit = db.get(`topteyit_${msg.guild.id}`);
  if (!isimler) db.set(`isimler_${uye.id}`, []);
  if (uye.roles.cache.get(cfg.roles.unregister)) {
    const nick = args.slice(1).join(" | ");
    if (!nick) return msg.channel.send("**Bir isim girmelisin.**").then(msj => msj.delete({ timeout: 5000 }));
    const tag = uye.user.username.includes(cfg.tag.taglıTag) ? cfg.tag.taglıTag : (cfg.tag.tagsızTag === "" ? cfg.tag.taglıTag : cfg.tag.tagsızTag);
    await uye.roles.remove(cfg.roles.unregister).catch();
    await uye.roles.add(cfg.roles.erkek).catch();
    await uye.setNickname(`${tag} ${nick}`).catch();
    await msg.channel.send(client.duzembed(`**${uye} adlı üyeye başarıyla <@&${cfg.roles.erkek[0]}> rolü verildi.**`)).catch();
    db.push(`isimler_${uye.id}`, `\`${tag} ${nick}\` - (<@&${cfg.roles.erkek[0]}>)`);
    db.add(`teyit.${author.id}.erkek`, 1);
  } else {
    await uye.roles.remove(cfg.roles.kız).catch();
    await uye.roles.add(cfg.roles.erkek).catch();
    await msg.channel.send(client.duzembed(`**${uye} adlı üyeye başarıyla <@&${cfg.roles.erkek[0]}> rolü verildi.**`)).catch();
  };
};

module.exports.help = {
  name: "erkek",
  alias: ["e"]
};

const banAtanlar = new Set();
const moment = require("moment");

const tarih = moment(Date.parse(new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul"}))).format("LLL");

module.exports.operate = async ({msg, client, uye, author, args, db, cfg}) => {
  if (!author.permissions.has("BAN_MEMBERS") && !author.roles.cache.get(cfg.roles.banH)) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
  if (!uye) return msg.channel.send("**Bir üyeyi etiketlemelisin.**").then(x => x.delete({ timeout: 5000 }));
  if (uye.permissions.has("BAN_MEMBERS") && uye.roles.cache.get(cfg.roles.banH)) return msg.channel.send("**Ban yetkisi olan birisini banlayamazsın.**").then(a => a.delete({ timeout: 5000 }));
  if (author.roles.highest.position <= uye.roles.highest.position) return msg.channel.send("**Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!**").then(x => x.delete({timeout: 5000}));
  if (!banAtanlar[msg.author.id]) banAtanlar[msg.author.id] = { sayi: 0 };
  if (banAtanlar[msg.author.id].sayi >= 3) return msg.channel.send("**1 saat içinde maximum 3 ban atabilirsin.**").then(a => a.delete({ timeout: 5000 }));
  let reason = args.slice(1).join(" ") || "Sebep Girilmedi.";
  const sicil = db.get(`sicil_${uye.id}`);
  if (!sicil) db.set(`sicil_${uye.id}`, []);
  await msg.guild.members.ban(uye.id, {reason: reason, days: 7 }).catch(err => msg.channel.send(err.message));
  await msg.channel.send({embed:{description:`**${uye.user.tag}** adlı üye ${msg.author} tarafından **${reason}** sebebiyle sunucudan yasaklandı`, color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)], timestamp: new Date()}});
  await db.push(`sicil_${uye.id}`, { yetkili: author.id, tip: "ban", sebep: reason, zaman: Date.now() });
  await db.add(`banAtma_${author.id}`, 1);
  console.log(db.get(`sicil_${uye.id}`));
  banAtanlar[msg.author.id].sayi++;
  setTimeout(() => {
    if (banAtanlar[msg.author.id].sayi >= 1) {
      banAtanlar[msg.author.id].sayi = 0;
    };
  }, 3600000);
};

module.exports.help = {
  name: "ban",
  alias: ["yak", "yargı", "yoket", "idam"]
};

module.exports.operate = ({client, msg, args}) => {
  if (msg.channel.id !== "776724179788890121") return msg.channel.send("<#776724179788890121>");
  let kullanici = msg.mentions.users.first() || client.users.cache.get(args[0]) || msg.author;
  let avatar = kullanici.avatarURL({ dynamic: true, size: 2048 });
  msg.channel.send({
    embed: {
      author: { name: kullanici.tag, icon_url: avatar },
      description: `[Resim Adresi](${avatar})`,
      footer: {
        text: `${msg.member.displayName} tarafından istendi.`,
        icon_url: msg.author.avatarURL({ dynamic: true })
      },
      image: { url: avatar },
      timestamp: new Date(),
      color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)]
    }
  });
};

module.exports.help = {
  name: "avatar",
  alias: ["gif", "pp"]
};

module.exports.operate = ({author, msg, args, db}) => {
  let afkSebebi = args.join(" ");
  let afkRoles = msg.mentions.roles.first();
  if (
    afkSebebi.toLowerCase().includes(".com") ||
    afkSebebi.toLowerCase().includes("discord.gg") ||
    afkSebebi.toLowerCase().includes("http") ||
    afkSebebi.toLowerCase().includes(afkRoles) ||
    afkSebebi.toLowerCase().includes("@everyone") ||
    afkSebebi.toLowerCase().includes("@here")
  ) {
    msg.delete();
    msg.reply("**Bir daha linki veya everı atarsan senin o ananı yerden yere vururum**");
    return;
  };
  if (!afkSebebi) afkSebebi = "Şuanda AFK'yım en kısa sürede döneceğim. ?";
  setTimeout(function() {
    db.set(`afk_${msg.author.id}, ${msg.guild.id}`, afkSebebi);
    db.set(`afk-zaman_${msg.author.id}, ${msg.guild.id}`, Date.now());
  }, 700);
  msg.reply(`**${afkSebebi}** sebebi ile [AFK] moduna giriş yaptınız.`).then(x => x.delete({ timeout: 6000}));
  if (!author.nickname) return author.setNickname("[AFK] " + msg.member.user.username);
  author.setNickname("[AFK] " + msg.member.nickname).catch(err => console.log(err));
};

module.exports.help = {
  name: "afk",
  alias: []
};

module.exports.operate = async ({client, msg, args, author, uye, cfg}) => {
  if (!author.roles.cache.get(cfg.roles.transport) && !author.permissions.has("ADMINISTRATOR")) return msg.channel.send('**Gerekli yetkiye sahip değilsin.**').then(m => m.delete({ timeout: 3000 }));
  const channel = args[0];
  if (!channel) {
    
  } else if (channel) {
    let gidilecek = args[1];
    if (!gidilecek) return msg.channel.send("**Gitmek istediğin bir kanal idsi belirtmedin.**").then(msj => msj.delete({ timeout: 5000 }));
    await msg.channel.send(client.nrmlembed(`**Başarıyla`))
    await msg.guild.channels.cache.get(channel).members.cache.map(uye => uye.voice.setChannel(gidilecek));

  }
};

module.exports.help = {
  name: "topluçek",
  alias: []
};

module.exports = (fs, client) => {
  fs.readdir("./komutlar/", (err, files, komutlar = []) => {
    console.log("Komutlar Yükleniyor.");
    if (err) return console.log("Error var error " + err);
    files.filter(f => f.endsWith(".js")).forEach(file => {
      let prop = require(`../komutlar/${file}`);
      client.commands.set(prop.help.name, prop);
      prop.help.alias.forEach(alias => {
        client.aliases.set(alias, prop.help.name);
      });
    });
    for (var value of client.commands.values()) komutlar.push(value.help.name);
    console.log("[" + komutlar.join(", ") + "]" + " isimli komut(lar) yüklendi. (" + files.length + ")");
    console.log("--------------------------");
  });
};

const { MessageEmbed } = require("discord.js");

module.exports = (client, cfg) => {
  
  client.favoriRenkler = new Array("#0b0067", "#4a0038", "#07052a", "#1f0524");
  
  client.duzembed = (message) => {
    return {
      embed: {
        description: message,
        color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],
        timestamp: new Date(),
        footer: {
          text: `${[client.xd[Math.floor(Math.random() * client.xd.length)]]}`
        }
      }
    };
  };
  
  client.toFlat = Object.defineProperty(Array.prototype, "flat", {
     value: (depth = 1) => {
       return Array.prototype.reduce((flat, toFlatten) => {
         return flat.concat(Array.isArray(toFlatten) && depth > 1 ? toFlatten.flat(depth - 1) : toFlatten);
       }, []);
     }
  });
  
  client.emojili = (string) => {
    let str = "";
    String(string).split("").forEach(x => {
      str += "" + cfg.sayilar[Number(x)];
    });
    return str;
  };
  
  client.beko = async (msg, rolID, veren, sunucu, tip, args, arr) => {
  let author = msg.guild.member(msg.author);
  let uye = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(args);
  if (tip === "normal") {
    if (!author.roles.cache.get(cfg.roles.yetkiliRoller.botc) && !author.permissions.has("MANAGE_ROLES")) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
    if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(m => m.delete({ timeout: 5000 }));
    if (uye.roles.cache.get(rolID)) {
      await uye.roles.remove(rolID).catch();
      await msg.channel.send(client.duzembed(`**${uye} adlı üyeden <@&${rolID}> rolü alındı.**`)).then(m => m.delete({ timeout: 5000 }));
    } else {
      await uye.roles.add(rolID).catch();
      await msg.channel.send(client.duzembed(`**${uye} adlı üyeye <@&${rolID}> rolü verildi.**`)).then(m => m.delete({ timeout: 5000 }));
    };
  } else if (tip === "custom") {
    if (!arr.includes(author.id)) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
    if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(m => m.delete({ timeout: 5000 }));
    if (uye.roles.cache.get(rolID)) {
      await uye.roles.remove(rolID).catch();
      await msg.channel.send(client.duzembed(`**${uye} adlı üyeden <@&${rolID}> rolü alındı.**`)).then(m => m.delete({ timeout: 5000 }));
    } else {
      await uye.roles.add(rolID).catch();
      await msg.channel.send(client.duzembed(`**${uye} adlı üyeye <@&${rolID}> rolü verildi.**`)).then(m => m.delete({ timeout: 5000 }));
      };
    };
  };

  client.getDate = (date, type) => {
    let sure;
    date = Number(date);
    if (type === "saniye") { sure = (date * 1000) }
    else if (type === "dakika") { sure = (60 * 1000) * date }
    else if (type === "saat") { sure = ((60 * 1000) * 60) * date }
    else if (type === "gün") { sure = (((60 * 1000) * 60) * 24) * date }
    else if (type === "hafta") { sure = ((((60 * 1000) * 60) * 24) * 7) * date }
    else if (type === "ay") { sure = ((((60 * 1000) * 60) * 24) * 30) * date }
    else if (type === "yıl") { sure = ((((((60 * 1000) * 60) * 24) * 30) * 12) + 5) * date };
    return sure;
  };
  
  client.getRandomInt = (min, max) => {
    (min = Number(min)), (max = Number(max));
    return min + Math.floor((max - min) * Math.random());
  };
  
  client.nrmlembed = (message) => {
    return {
      embed: {
        description: message,
        timestamp: new Date(),
        color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)]
      }
    };
  };
  
  client.banembed = (message) => {
    return {
      embed: {
        description: message,
        timestamp: new Date(),
        color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],
        footer: {
          text: `Bugün saat:`
        }
      }
    };
  };
  
  client.toDate = (date) => {
    var tarih = "";
    tarih = new Date(date).toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" }).replace("AM", "").replace("PM", "").replace(",", "");
    return tarih;
  };
  
  client.xd = [
    "Nefes alıp veriyoruz hepimizin sorunu başka...",
    "Karışık duygularıma kör düğüm atarım...",
    "Kahverengi gözlerin var ama gökyüzü gibi bakıyosun.",
    "Herkes merak içinde ölümden sonra hayat var mı diye boşuna düşünürler sanki hayat varmış gibi ölümden önce.",
    "Güne açan çiçekler gibiyiz, yalaaaaaaaaaaağn",
    "Başka bir yer varsa orada tekrar görüşürüz belki yoksa da seni tanımak benim cennetimdi zaten.",
    "Bir gün gelir aşk biter, insafsızca terk eder. Bütün bunların ardından sadece gözyaşı kalır.",
    "Havam bozulmaya başladı yine. Gözlerim de dolmaya. Sanırım içimde bir yerlere sen yağdı gece gece...",
    "Yalanlarımız güzel, inanması zevkli.",
    "Çık hücrenden, ruhunu göster",
    "Hiç bir melek ölmez ama sen bi kere dirilmedin.",
    "Klasik oldu ama her şeye rağmen hayattayız yanımızda hatalarımız.",
    "Niye küstahça bakışlara sabır ediyorum?",
    "Silgiyle iz bıraktın, kalemle silinmedin.",
    "Amacım kötü değil, istiyordum yardım ama dönülmez akşamların ufkunda kaldım",
    "Hayattan ne istediğimi bilmiyorum aslında...",
    "Sokiyim böyle dünyaya...",
    "Her şeyi bilen sen. Bilemedin bir beni",
    "Her şeyi gören sen. Göremedin mi beni?",
    "Her şeyi duyan sen. Duyamadın mı beni?",
    "Ben olmasam bile hayat gülsün sana.", 
    "Prensese benim ol dedikçe daha çok uzaklaştı.",
    "Tanrıyı cenneten gelip bizi kurtarmadığı için suçlamıyorum, çünkü hiçbir şeyi hak etmiyoruz.","Senin olanın yokluğu, bir alev gibi yaktı mı hiç seni?"
  ];
  
  client.clean = (text) => {
	  if (typeof text !== "string")
	  text = require("util").inspect(text, { depth: 0 })
	  text = text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203))
	  return text;
  };
};
///////////////////////////////////////////////////

module.exports = (fs, client) => {
  fs.readdir("./events/", (err, files, events = []) => {
    if (err) return console.log(err);
    console.log("--------------------------");
    console.log("Eventler yükleniyor.");
    files.filter(f => f.endsWith(".js")).forEach(file => {
      let prop = require(`../events/${file}`);
      client.on(prop.help.name, prop.event);
      events.push(prop.help.name);
    });
    console.log("[" + events.join(", ") + "] " +  " isimli event(ler) yüklendi.");
    console.log("--------------------------");
  });
};

module.exports = (client, cfg) => client.login(cfg.qwe).catch(err => console.log(err.message));

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

module.exports.help = { name: "ready" };

class CheckRoles {
  constructor(client, db, sunucu, cfg) {
    this.client = client;
    this.db = db;
    this.sunucu = sunucu;
    this.cfg = cfg;
  }
  chatMuteler() {
    const tempmuteler = this.db.get(`tempmute_${this.sunucu}`) || [];
    if (tempmuteler.length < 1) return;
    for (let muteli of tempmuteler) {
      const uye = this.client.guilds.cache.get(this.sunucu).members.cache.get(muteli.id);
      if (Date.now() >= muteli.kalkmaZamani) {
        this.db.set(`tempmute_${this.sunucu}`, tempmuteler.filter(x => x.id !== muteli.id));
        if (uye && uye.roles.cache.get(this.cfg.roles.muted)) uye.roles.remove(this.cfg.roles.muted).catch();
      } else {
        if (uye && !uye.roles.cache.get(this.cfg.roles.muted)) uye.roles.add(this.cfg.roles.muted).catch();
      };
    };
  }
 async tempJailler() {
    const tempjailler = this.db.get(`tempj_${this.sunucu}`) || [];
    if (tempjailler.length < 1) return;
    for (let jail of tempjailler) {
      const uye = this.client.guilds.cache.get(this.sunucu).members.cache.get(jail.id);
      if (Date.now() >= jail.kalkmaZamani) {
        this.db.set(`tempj_${this.sunucu}`, tempjailler.filter(x => x.id !== jail.id));
        if (uye && uye.roles.cache.get(this.cfg.roles.jail)) uye.roles.set(uye.roles.cache.get(this.cfg.roles.booster) ? [this.cfg.roles.booster, this.cfg.roles.unregister] : [this.cfg.roles.unregister]);
      } else {
        if (uye && !uye.roles.cache.get(this.cfg.roles.jail)) uye.roles.set(uye.roles.cache.get(this.cfg.roles.booster) ? [this.cfg.roles.booster, this.cfg.roles.jail] : [this.cfg.roles.jail]);
      };
    };
  }
  yasakliTagKontrol() {
    var yasakliTagKontrol = this.db.get(`yasakliTagKontrol_${this.sunucu}`) || "kapali";
    if (yasakliTagKontrol === "kapali") return;
    var yasakliTagRol = this.db.get(`yasakliTagRol_${this.sunucu}`) || this.cfg.roles.yasaklıTagRol;
    var yasakliTag = this.db.get(`yasakliTag_${this.sunucu}`) || this.cfg.tag.yasakliTaglar;
    let guild = this.client.guilds.cache.get(this.sunucu);
    yasakliTag.forEach(tag => {
      var x = guild.members.cache.filter(gmember => gmember.user.username.includes(tag) && !gmember.roles.cache.get(yasakliTagRol));
      if (x.length < 1) return;
      x.map(u => u.roles.cache.get(this.cfg.roles.booster) ? u.roles.set([this.cfg.roles.booster, yasakliTagRol]) : u.roles.set([yasakliTagRol]));
    });
  }
}

module.exports.event = (client = global.client, db = require("quick.db"), cfg = require("../config.json")) => {
  setInterval(() => new CheckRoles(client, db, cfg.sunucu, cfg).chatMuteler(), client.getDate(3, "dakika"));
  setInterval(() => new CheckRoles(client, db, cfg.sunucu, cfg).yasakliTagKontrol(), client.getDate(37, "dakika"));
  setInterval(() => new CheckRoles(client, db, cfg.sunucu, cfg).tempJailler(), client.getDate(1, "saat")+client.getDate(41, "dakika"));
};

module.exports.event = async (uye, client = global.client, cfg = require("../config.json"), db = require("quick.db")) => {
  const yasakliTag = db.get(`yasakliTag_${uye.guild.id}`) || cfg.tag.yasakliTaglar;
  const yasakliTagRol = db.get(`yasakliTagRol_${uye.guild.id}`) || cfg.roles.yasaklıTagRol;
  const fakeRol = cfg.roles.fakeRol;
  const yasaklıKontrol = db.get(`yasakliTagKontrol_${uye.guild.id}`) || "kapali";
  let tag = cfg.tag.tagsızTag === "" ?  cfg.tag.taglıTag : cfg.tag.tagsızTag;
  let zaman = (new Date().getTime() - uye.user.createdAt.getTime());
  
  if (client.cezalilar.has(uye.id)) return uye.roles.add(cfg.roles.jail);
  if (client.cmuteliler.has(uye.id)) return uye.roles.add(cfg.roles.muted);
  if (yasakliTag.includes(uye.user.username)) {
    if (yasaklıKontrol === "kapali") return null;
    if (yasakliTagRol === "") {
      await uye.roles.add(cfg.roles.unregister).catch();
      await uye.guild.channels.cache.get(cfg.chats.kayıtChat)
      .send(
      `${uye} adlı üye yasaklı bir tag kullanıyor fakat yasaklı tag rolü girilmediği için kayıtsız permi verdim.`
    ).catch();
  } else {
      await uye.roles.add(yasakliTagRol).catch();
      await uye.guild.channels.cache.get(cfg.chats.kayıtChat).send({ embed: { description: `${uye} adlı üye isminde yasaklı tag bulundurduğu için yasaklı taga atıldı.`}}).catch();
      if (uye.roles.cache.get(cfg.roles.unregister)) uye.roles.remove(cfg.roles.unregister).catch(err => console.log(err.message));
    };
  };
  if (zaman < client.getDate(1, "hafta")) {
    if (fakeRol === "") {
     await uye.roles.add(cfg.roles.unregister).catch();
     await uye.guild.channels.cache.get(cfg.chats.kayıtChat)
        .send(
        `${uye} adlı üyenin hesabı 1 haftadan önce kurulmasına rağmen \`şüpheli\` rolü bulunamadığı için unregister permi verildi`
      ).catch();
      return;
    } else {
      await uye.roles.add(fakeRol).catch();
      await uye.send(
        `Hesabın 1 haftadan önce açıldığı için *şüpheli* kısmına atıldın. Eğer Discordda yeni isen sağ üstten birisine ulaşarak sunucuya giriş yapabilirsin.`
      ).catch(err => uye.guild.channels.cache.get(cfg.chats.kayıtChat).send(`${uye} adlı üyenin hesabı 1 hafta önceden açıldığı için şüpheli permi verildi.`));
    };
  } else {
    await uye.roles.add(cfg.roles.unregister);
    await uye.setNickname(`${tag} İsim | yaş`);
    await uye.guild.channels.cache.get(cfg.chats.kayıtChat).send(
      `qwe`
    ).catch();
  };
};

module.exports.help = { name: "guildMemberAdd" };

module.exports.event = (uye, client = global.client, db = require("quick.db"), cfg = require("../config.json")) => {
  if (cfg.roles.jail === "") {} else {
    if (uye.roles.cache.get(cfg.roles.jail)) {
      client.cezalilar.set(uye.id);
    };
  };
};

module.exports.help = { name: "guildMemberRemove" };

module.exports.help = { name: "message" };

module.exports.event = async (msg, cfg = require("../config.json")) => {
  var iltifat = 0;
  if (msg.author.bot || msg.channel.id !== cfg.chats.gchat) return;
  iltifat++;
  if (iltifat >= 70) {
    msg.reply(iltifatSözleri[Math.floor(Math.random() * iltifatSözleri.length)]);
    iltifat = 0;
  };
};

var iltifatSözleri = [];

module.exports.event = (msg, client = global.client, cfg = require("../config.json")) => {
  if (msg.content.toLowerCase().startsWith("!tag")) return msg.channel.send(cfg.tag.taglıTag);
  if (msg.content.toLowerCase().startsWith("!link")) return msg.channel.send(cfg.link);
  let prefixMention = new RegExp(`^<@!${client.user.id}>`);
  let pref = msg.content.match(prefixMention) ? msg.content.match(prefixMention)[0] : cfg.prefix.toLowerCase();
  if (!msg.content.toLowerCase().startsWith(cfg.prefix)) return;
  if (msg.author.bot || msg.guild.id !== cfg.sunucu || msg.channel.type === "dm") return;
  let args = msg.content.slice(cfg.prefix.length).trim().split(/ +/g);
  let command = args.shift().toLowerCase();
  let cmd;
  let author = msg.guild.member(msg.author);
  let uye = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(args[0]);
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  };
  if (cmd) {
    cmd.operate({ client: client, msg: msg, args: args, author: author, uye: uye, cfg: cfg, db: require("quick.db") });
  };
};

module.exports.help = { name: "message" };

module.exports.help = { name: "messageDelete" };

class MessageDelete {
  constructor(msg, sunucu) {
    this.msg = msg;
    this.sunucu = sunucu;
  }
  
  logla(kanal) {
    if (this.msg.author.bot || this.msg.channel.type === "dm") return;
    if (this.msg.guild.id !== this.sunucu) return;
    if (this.msg.attachments.first()) {
      kanal.send({
        embed: {
          description:
            this.msg.channel +
            " kanalında " +
            this.msg.author +
            " tarafından bir fotoğraf silindi. \n Silinen Fotoğraf : ",
          footer: {
            text: "Silindiği Saat:"
          },
          timestamp: new Date(),
          author: {
            name: this.msg.author.tag,
            icon_url: this.msg.author.avatarURL
          },
          thumbnail: {
            url: this.msg.author.avatarURL
          },
          image: {
            url: this.msg.attachments.first().proxyURL
          },
          color: Math.floor(Math.random() * (0xffffff + 1))
        }
      });
    } else {
      kanal.send({
        embed: {
          color: Math.floor(Math.random() * (0xffffff + 1)),
          footer: {
            text: "Silindiği Saat:"
          },
          timestamp: new Date(),
          author: {
            name: this.msg.author.tag,
            icon_url: this.msg.author.avatarURL
          },
          thumbnail: {
            url: this.msg.author.avatarURL
          },
          description:
            this.msg.channel.name +
            " kanalında <@" +
            this.msg.author +
            "> tarafından bir mesaj silindi. \n\n Silinen Mesaj : " +
            this.msg.content
        }
      });
    };
  }
  
  snipe(db) {
    db.set(`snipe_${this.sunucu}`, {
      content: this.msg.content,
      kanal: this.msg.channel.id,
      author: this.msg.author.id
    });
  }
}

module.exports.event = (msg, { sunucu } = require("../config.json"), db = require("quick.db")) => {
  new MessageDelete(msg, sunucu).logla(msg.guild.channels.cache.find(c => c.name === "message-log"));
  new MessageDelete(msg, sunucu).snipe(db);
};

module.exports.help = { name: "messageUpdate" };

class MessageUpdate {
  constructor(oldMessage, newMessage, sunucu) {
    this.oldMessage = oldMessage;
    this.newMessage = newMessage;
    this.sunucu = sunucu;
  }
  logla(kanal) {
    if (this.newMessage.author.bot || this.newMessage.channel.type === "dm") return;
    if (this.newMessage.guild.id !== this.sunucu) return;
    if (this.oldMessage.content.toLowerCase() === this.newMessage.content.toLowerCase()) return;
    if (!kanal) return null;
    kanal.send({
      embed: {
        description:
          this.newMessage.channel.name +
          " kanalında <@" +
          this.newMessage.author +
          "> tarafından bir mesaj düzenlendi. \n\n Eski Mesaj : " +
          this.oldMessage.content +
          "\n\n Yeni Mesaj : " +
          this.newMessage.content,
        color: Math.floor(Math.random() * (0xffffff + 1)),
        author: {
          name: this.newMessage.author.tag,
          icon_url: this.newMessage.author.avatarURL
        },
        thumbnail: {
          url: this.newMessage.author.avatarURL
        },
        timestamp: new Date()
      }
    });
  }
}

module.exports.event = (oldMessage, newMessage, { sunucu } = require("../config.json"), cfg = require("../config.json") ,client = global.client, db = require("quick.db")) => {
  let messageLog = newMessage.guild.channels.cache.find(c => c.name === "message-log");
  new MessageUpdate(oldMessage, newMessage, sunucu, client).logla(messageLog);
};

class Login {
  constructor(client) {
    this.client = client;
  }
  log(guild) {
    this.client.user.setStatus("idle");
    console.log("("+this.client.user.username +") adlı hesapta [" +guild.name +"] adlı sunucuda giriş yapıldı.");
  }
}

class ChatEdit {
  constructor(client, sunucu, chat, sncIsim, tagrolIsim, tag) {
    this.client = client;
    this.sunucu = sunucu;
    this.chat = chat;
    this.sncIsim = sncIsim;
    this.tagrolIsim = tagrolIsim;
    this.tag = tag;
  }
  edit() {
    let guild = this.client.guilds.cache.get(this.sunucu);
    let kanal = guild.channels.cache.get(this.chat);
    if (!kanal) return null;
    let cookie = 0;
    let sayi = guild.memberCount;
    let taglı = guild.members.cache.filter(u => u.user.username.includes(this.tag)).size;
    let online = guild.members.cache.filter(u => u.presence.status !== "offline").size;
    cookie = cookie + 1;
    if (cookie === 1) {
      kanal.edit({
        topic: `**${this.sncIsim}: ${this.client.emojili(sayi)} Online: ${this.client.emojili(online)} ${this.tagrolIsim}: ${this.client.emojili(taglı)}**`
      });
    } else if (cookie === 2) {
      kanal.edit({
        topic: `**${this.sncIsim}: ${this.client.emojili(sayi)} Online: ${this.client.emojili(online)} ${this.tagrolIsim}: ${this.client.emojili(taglı)}**`
      });
    } else if (cookie === 3) {
      kanal.edit({
        topic: `**${this.sncIsim}: ${this.client.emojili(sayi)} Online: ${this.client.emojili(online)} ${this.tagrolIsim}: ${this.client.emojili(taglı)}**`
      });
    } else if (cookie === 4) {
      cookie = 0;
      kanal.edit({
        topic: `**${this.sncIsim}: ${this.client.emojili(sayi)} Online: ${this.client.emojili(online)} ${this.tagrolIsim}: ${this.client.emojili(taglı)}**`
      });
    };
  }
}

module.exports.help = { name: "ready" };

module.exports.event = (client = global.client, { sunucu, roles } = require("../config.json"), cfg = require("../config.json"), db = require("quick.db")) => {
  new Login(client).log(client.guilds.cache.get(sunucu));
  setInterval(() => new ChatEdit(client, sunucu, cfg.chats.gchat, cfg.snc.sncIsim, cfg.snc.tagRolIsim, cfg.tag.taglıTag).edit(), client.getDate(5, "dakika"));
};

module.exports.help = { name: "userUpdate" };

class Tag {
  constructor(oldUser, newUser, client, tagRol, tag, tagsıztag, sunucu) {
    this.oldUser = oldUser;
    this.newUser = newUser;
    this.client = client;
    this.tagrol = tagRol;
    this.tag = tag;
    this.tagsıztag = tagsıztag;
    this.sunucu = sunucu;
  };

  async tagKontrol() {
    const guild = this.client.guilds.cache.get(this.sunucu);
    let nick = guild.members.cache.get(this.newUser.id).displayName;
    if (this.newUser.username.includes(this.tag)) {
      const sembol = nick.replace(this.tagsıztag, this.tag);
      if (this.oldUser.username.includes(this.tag)) return;
      if (this.tagsıztag === "") return guild.members.cache.get(this.newUser.id).roles.add(this.tagrol);
      await guild.members.cache.get(this.newUser.id).roles.add(this.tagrol);
      await guild.members.cache.get(this.newUser.id).setNickname(sembol);
    } else {
      if (!this.oldUser.username.includes(this.tag)) return;
      if (this.tagsıztag === "") return guild.members.cache.get(this.newUser.id).roles.remove(this.tagrol);
      const sembol = nick.replace(this.tag, this.tagsıztag);
      await guild.members.cache.get(this.newUser.id).roles.remove(this.tagrol);
      await guild.members.cache.get(this.newUser.id).setNickname(sembol);
    };
  };
  
  async yasakliTagKontrol(db) {
    var yasakliTagKontrol = db.get(`yasakliTagKontrol_${this.sunucu}`) || "kapali";
    if (yasakliTagKontrol === "kapali") return;
    var yasakliTagRol = db.get(`yasakliTagRol_${this.sunucu}`) || this.cfg.roles.yasaklıTagRol;
    var yasakliTag = db.get(`yasakliTag_${this.sunucu}`) || this.cfg.tag.yasakliTaglar;
    let guild = this.client.guilds.cache.get(this.sunucu);
    yasakliTag.forEach(tag => {
    guild.members.cache.filter(gmember => gmember.user.username.includes(tag))
      .map(u => u.roles.cache.get(this.cfg.roles.booster) ? u.roles.set([this.cfg.roles.booster, yasakliTagRol]) : u.roles.set([yasakliTagRol]));
    });

  }
};

module.exports.event = async (oldUser,newUser,client = global.client,{ roles, tag, sunucu } = require("../config.json"), db = require("quick.db")) => {
  new Tag(oldUser, newUser, client, roles.tagRol, tag.taglıTag, tag.tagsızTag, sunucu).tagKontrol();
};

const { Client } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const client = new Client({ disableMentions: "everyone", ignoreDirect: true, ignoreRoles: true });
const cfg = require("./config.json");

client.commands = new Map();
client.aliases = new Map();
client.cezalilar = new Set();
client.cmuteliler = new Set();
client.locked = new Set();
global.client = client;

require("./beko/functions.js")(client, cfg);
require("./beko/load.js")(fs, client);
require("./beko/commandHandler.js")(fs, client);
require("./beko/login.js")(client, cfg);

{
  "sunucu": "772142910216863744",
  "prefix": ".",
  "qwe": "NzMxNjU5MTE3MTc2ODE1NjU3.XwpQpw.a54SdcenCMmgmNxiPkBUvMpzaAA",
  "sahipler": ["676918044668330005"],
  "link": "x",
  "sayilar": [
    "<a:0_:780173053631660042>",
    "<a:1_:780173053534797834>",
    "<a:2_:780173053845962753>",
    "<a:3_:780173053762076693>",
    "<a:4_:780173054310613012>",
    "<a:5_:780173054511677460>",
    "<a:6_:780173054428053524>",
    "<a:7_:780173054605000714>",
    "<a:8_:780173054059085855>",
    "<a:9_:780173054378508298>"
  ],
  "roles": {
    "unregister": "772177057933164605",
    "erkek": ["772177057933164605"],
    "kız": [],
    "botc": "772177057933164605",
    "yasaklıTagRol": "",
    "fakeRol": "",
    "jail": "779353933403127809",
    "muted": "772177057933164605",
    "muteH": "",
    "jailH": "",
    "banH": "",
    "tagRol": "772177057933164605",
    "booster": "",
    "yetkiliRoller": ["772177057933164605"]
  },

  "tag": {
    "taglıTag": "db",
    "tagsızTag": "",
    "yasakliTaglar": []
  },

  "chats": {
    "gchat": "",
    "kayıtChat": "779365107083116574",
    "banLog": "",
    "jailLog": "",
    "muteLog": "",
    "uyariLog": ""
  },

  "snc": {
    "sncIsim": "x",
    "tagRolIsim": "xx"
  }
}

{
  "main": "LONA.js",
  "scripts": {
    "start": "node LONA.js"
  },
  "dependencies": {
    "discord.js": "^12.4.1",
    "express": "^4.17.1",
    "fs": "0.0.1-security",
    "moment": "^2.29.1",
    "moment-duration-format": "^2.3.2",
    "ms": "^2.1.2",
    "parse-ms": "^2.1.0",
    "quick.db": "^7.1.3"
  }
}
