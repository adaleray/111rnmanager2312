module.exports.operate = ({client, msg, args}) => {
  if (msg.channel.id !== "779365107083116574") return msg.channel.send("<#776724179788890121>");
  let kullanici = msg.mentions.users.first() || client.users.cache.get(args[0]) || msg.author;
  let avatar = kullanici.avatarURL({ dynamic: true, size: 2048 });
  msg.channel.send({
    embed: {
      author: { name: kullanici.tag, avatar },
      footer: {
        text: `${msg.member.displayName} tarafından istendi.`,
        icon_url: msg.author.avatarURL({ dynamic: true })
      },
      description: `[Resim Adresi](${avatar})`,
      image: avatar
    }
  });
};

module.exports.help = {
  name: "avatar",
  alias: ["gif", "pp"]
};