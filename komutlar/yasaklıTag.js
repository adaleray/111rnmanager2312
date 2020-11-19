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
        
      });
    }
    
  } else if (type === "rol-sil") {
    
  } else if (type === "tag-ekle") {
    
  } else if (type === "tag-sil") {
    
  };
  
};

module.exports.help = {
  name: "yasaklıtag",
  alias: []
};