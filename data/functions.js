module.exports = (client, cfg) => {
  client.duzembed = (message) => {
    return {
      embed: {
        description: message,
        color: Math.floor(Math.random() * (0xFFFFFF + 1)),
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
  
  client.checkPermissions = (msg, type, perm, message, timeout) => {
    timeout = Number(timeout);
    var author = msg.guild.member(msg.author);
    if (type === "kisiler") {
      if (Array.isArray(perm)) {
        if (!perm.includes(author.id)) return msg.channel.send(message).then(m => m.delete({ timeout: timeout }));
      } else {
        if (author.id !== perm) return msg.channel.send(message).then(m => m.delete({ timeout: timeout }));
      };
    } else if (type === "roller") {
      if (Array.isArray(perm)) {
        if (!author.roles.cache.some(r => perm.includes(r.id))) return msg.channel.send(message).then(m => m.delete({ timeout: timeout }));
      } else {
        if (!author.roles.cache.get(perm)) return msg.channel.send(message).then(m => m.delete({ timeout: timeout }));
      };
    } else if (type === "yetkiler") {
      if (author.permissions.has(perm)) return msg.channel.send(message).then(m => m.delete({ timeout: timeout }));
    };
  };
  
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
      await msg.channel.send(duzembed(`**${uye} adlı üyeden <@&${rolID}> rolü alındı.**`)).then(m => m.delete({ timeout: 5000 }));
    } else {
      await uye.roles.add(rolID).catch();
      await msg.channel.send(duzembed(`**${uye} adlı üyeye <@&${rolID}> rolü verildi.**`)).then(m => m.delete({ timeout: 5000 }));
    };
  } else if (tip === "custom") {
    if (!arr.includes(author.id)) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
    if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(m => m.delete({ timeout: 5000 }));
    if (uye.roles.cache.get(rolID)) {
      await uye.roles.remove(rolID).catch();
      await msg.channel.send(duzembed(`**${uye} adlı üyeden <@&${rolID}> rolü alındı.**`)).then(m => m.delete({ timeout: 5000 }));
    } else {
      await uye.roles.add(rolID).catch();
      await msg.channel.send(duzembed(`**${uye} adlı üyeye <@&${rolID}> rolü verildi.**`)).then(m => m.delete({ timeout: 5000 }));
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
        color: Math.floor(Math.random() * (0xffffff + 1))
      }
    };
  };
  
  client.banembed = (message) => {
    return {
      embed: {
        description: message,
        timestamp: new Date(),
        color: Math.floor(Math.random() * (0xffffff + 1)),
        footer: {
          text: `Bugün saat:`
        }
      }
    };
  };
};
///////////////////////////////////////////////////

///////////////////////////////////////////////////
function duzembed(msj) {
  return {
    embed: {
      description: msj,
      timestamp: new Date(),
      color: Math.floor(Math.random() * (0xFFFFFF + 1)),
      footer: {
        text: `${[global.client.xd[Math.floor(Math.random() * global.client.xd.length)]]}`
      }
    }
  };
};