module.exports.event = async (uye, client = global.client, cfg = require("../config.json"), db = require("quick.db")) => {
  
  const yasakliTag = db.get(`yasakliTag_${uye.guild.id}`) || cfg.tag.yasakliTaglar;
  let yasakliTagRol = db.get(`yasakliTagRol_${uye.guild.id}`) || cfg.roles.yasaklıTagRol;
  let fakeRol = cfg.roles.fakeRol;
  
  let tag = cfg.tag.tagsızTag === "" ?  cfg.tag.taglıTag : cfg.tag.tagsızTag;
  
  let zaman = (new Date().getTime() - uye.user.createdAt.getTime());
  if (yasakliTag.includes(uye.user.username)) {
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
      ``
    ).catch();
  };
};

module.exports.help = { name: "guildMemberAdd" };