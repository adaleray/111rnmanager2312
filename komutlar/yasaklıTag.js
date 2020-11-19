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
             m.edit("Komut iptal edildi.").then(m => m.delete({ timeout: 4000 }));
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
      await msg.channel.send("**")
    };
  } else if (type === "tag-ekle") {
    
  } else if (type === "tag-sil") {
    
  };
  
};

module.exports.help = {
  name: "yasaklıtag",
  alias: []
};