module.exports.operate = async ({client, msg, args, db}) => {
  
  const ayar = args[1];
  
  if (!ayar) {
    const kisi = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(args[0]) || msg.guild.member(msg.author);
    let sicil = db.get(`sicil_${kisi.id}`) || [];
    let liste = sicil.length > 0 ? sicil.map((value, index) => `\`${index + 1}.\` **[${value.tip}]** ${value.zaman} tarihinde **${value.sebep}** ${msg.guild.members.cache.has(value.yetkili) ? msg.guild.members.cache.get(value.yetkili) : value.yetkili} tarafından atıldı.`).join("\n") : "Temiz!";
    msg.channel.send({embed:{author:{name: msg.guild.name,icon_url:msg.guild.iconURL({dynamic:true})},description:`**${kisi} (\`${kisi.id}\`) adlı üyenin sicil bilgisi.**\n\n${liste}`, color:Math.floor(Math.random()*(0xFFFFFF+1)),timestamp:new Date()}});
  };
};

function today(date) {
  var date = 
}
module.exports.help = {
  name: "sicil",
  alias: []
};