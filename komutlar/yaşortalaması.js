module.exports.operate = async ({client, msg, args, cfg, author}) => {
  if (!author.hasPermission("ADMINISTRATOR")) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(x => x.delete({timeout: 5000}));
  
  function ortalama(array) {
    if(array.length <= 0) return 0;
    const average = list => list.reduce((prev, curr) => prev + curr) / list.length;
    return Math.floor(average(array));
  };
  
  function emojiyeCevir(number) {
    var x = new Array();
    String(number).split("").filter(a => {
      if (a === "0") x.push(0);
      if (a === "1") x.push(1);
      if (a === "2") x.push(2);
      if (a === "3") x.push(3);
      if (a === "4") x.push(4);
      if (a === "5") x.push(5);
      if (a === "6") x.push(6);
      if (a === "7") x.push(7);
      if (a === "8") x.push(8);
      if (a === "9") x.push(9);
    });
    for (var a of x) msg.channel.send(a);
  };
  
  let members = msg.guild.members.cache;
  let genel = members.filter(member => member.nickname && member.nickname.includes('|') && !isNaN(member.nickname.split('| ')[1])).map(member => Number(member.nickname.split('| ')[1]));
  let erkek = members.filter(member => cfg.roles.erkek.some(rol => member.roles.cache.has(rol)) && member.nickname && member.nickname.includes('|') && !isNaN(member.nickname.split('| ')[1] || "")).map(member => Number(member.nickname.split('| ')[1]));
  let kiz = members.filter(member => cfg.roles.kız.some(rol => member.roles.cache.has(rol)) && member.nickname && member.nickname.includes('|') && !isNaN(member.nickname.split('| ')[1] || "")).map(member => Number(member.nickname.split('| ')[1]));
  let tagli = members.filter(member => member.roles.cache.has(cfg.tagrol) && member.nickname && member.nickname.includes('|') && !isNaN(member.nickname.split('| ')[1] || "")).map(member => Number(member.nickname.split('| ')[1]));
  let ses = members.filter(member => member.voice.channel && member.nickname && member.nickname.includes('|') && !isNaN(member.nickname.split('| ')[1] || "")).map(member => Number(member.nickname.split('| ')[1]));
  msg.channel.send(emojiyeCevir(ortalama(genel)));
  console.log(ortalama(genel));
};

module.exports.help = {
  name: "yaş-ortalaması",
  alias: ["yaşortalaması", "yas-ortalamasi", "yasortalamasi"]
};

 /*msg.channel.send({
   embed: { 
     description:`\`Sunucu Yaş Ortalaması:\` ${client.emojili(`${ortalama(genel)}`)}\n\`Erkek:\` ${client.emojili(`${ortalama(erkek)}`)}\n\`Kız:\` ${client.emojili(`${ortalama(kiz)}`)}\n\`Ekip:\` ${client.emojili(`${ortalama(tagli)}`)}\n\`Ses:\` ${client.emojili(`${ortalama(ses)}`)}`, 
     color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)], timestamp: new Date(), 
     author: { name: msg.guild.name, icon_url: msg.guild.iconURL({dynamic:true})}
   } 
  });*/