module.exports.execute = async ({client, msg, author, args, db, cfg}) => {
  if (!cfg.sahipler.includes(author.id)) return;
  var evet = "✅";
  var hayir = "❌";
  let type = args[0].toLowerCase();
  if (type === "rol-ekle") {
    const rol = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[1]);
    function onlarFilterBenBeko(r, u) { return [evet, hayir].includes(r.emoji.name) && u.id === msg.author.id };
    if (!rol) return msg.channel.send("**Bir rol etiketlemeli veya idsini girmelisin.**").then(m => m.delete({ timeout: 5000 }));
    if (db.get(`yasakliTagRol_${msg.guild.id}`)) {
      msg.channel.send({
        embed: { 
          description: `Yasaklı tag komutu için zaten bir role sahipsin. Onaylıyorsan kayıtlı rol yerine ${rol} rolünü yasaklı taga koyacağım.`,
          timestamp: new Date(),
          color:Math.floor(Math.random() * (0xFFFFFF + 1))
        }
      }).then(async (m) => {
        await m.react(evet);
        await m.react(hayir);
        m.awaitReactions(onlarFilterBenBeko, {
          max: 1
        }).then(async (collected) => {
          let cvp = collected.first();
          if (cvp.emoji.name === evet) {
            await db.set(`yasakliTagRol_${msg.guild.id}`, rol.id);
            await m.delete();
            await msg.channel.send({
              embed: {
                description: `Başarıyla yeni yasaklı tag rolünü ${rol} olarak ayarladım.`,
                timestamp: new Date(),
                color: Math.floor(Math.random() * (0xFFFFFF + 1))
              }
            }).then(msj => msj.delete({ timeout: 5000 }));
          } else {
             await m.delete();
             await msg.channel.send("**Komut iptal edildi.**").then(m => m.delete({ timeout: 5000 }));
          };
        });
      });
    } else {
      await db.set(`yasakliTagRol_${msg.guild.id}`, rol.id);
      msg.channel.send({
        embed: { 
          description: `Başarıyla yeni yasaklı tag rolünü ${rol} olarak ayarladım.`,
          timestamp: new Date(),
          color:Math.floor(Math.random() * (0xFFFFFF + 1))
        }
      });
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
    var arr = [];
    if (db.get(`yasakliTag_${msg.guild.id}`)) {
      var arr = [];
      await taglar.forEach(async (x) => {
        await db.push(`yasakliTag_${msg.guild.id}`, x);
        arr.push(x);
      });
      msg.channel.send(client.nrmlembed(`**Başarıyla** \`\`[${arr.join(" , ")}]\`\` **tag(lar)ı yasaklı taga atıldı.**\n\n__**Şuan Yasaklıda Olan Taglar: **__(\`${db.get(`yasakliTag_${msg.guild.id}`).join(", ")}\`)`));
    } else {
      var arr = [];
      await taglar.forEach(async (x) => {
         arr.push(x);
       });
      await db.set(`yasakliTag_${msg.guild.id}`, arr);
      msg.channel.send(client.nrmlembed(`**Başarıyla** \`\`[${arr.join(" , ")}]\`\` **tag(lar)ı yasaklı taga atıldı.**`));
    };
  } else if (type === "tag-sil") {
    var arr = [];
    var arr2;
    var taglar = args.slice(1).join("").split("");
    await db.get(`yasakliTag_${msg.guild.id}`).map(x => arr.push(x));
    await taglar.forEach(tag => {
      if (!arr.includes(tag)) return msg.channel.send(tag + " tagı zaten yasaklıda değil.");
      
    });
    
    await db.set(`yasakliTag_${msg.guild.id}`, arr2);
    msg.channel.send(client.nrmlembed(`**Başarıyla** \`\`[${taglar.join(" , ")}]\`\` **tag(lar)ı yasaklı tagdan çıkarıldı.**\n\n__**Şuan Yasaklıda Olan Taglar: **__(\`${db.get(`yasakliTag_${msg.guild.id}`).join(", ") || "Yasaklı Tag Yok !"}\`)`));
  };
};

module.exports.help = {
  name: "yasaklıtag",
  alias: []
};