module.exports = ({client, cfg, fs, db}) => {
  client.on("message", async (msg) => {
    if (msg.content.includes("discord.gg") && !author.permissions.has("MANAGE_ROLES")) return msg.guild.members.ban(msg.author, { days: 7, reason: "oc"});
    let prefixMention = new RegExp(`^<@!${client.user.id}>`);
    let pref = msg.content.match(prefixMention) ? msg.content.match(prefixMention)[0] : cfg.prefix.toLowerCase();
    if (!msg.content.toLowerCase().startsWith(cfg.prefix)) return;
    if (msg.author.bot || msg.guild.id !== cfg.sunucu || msg.channel.type === "dm") return;
    let args = msg.content.slice(cfg.prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();
    let cmd;
    let author = msg.guild.member(msg.author);
    let uye = msg.guild.member(msg.mentions.users.first());
    if (client.commands.has(command)) {
      cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    };
    if (cmd) {
      cmd.operate({client: client, msg: msg, args: args, author: author, uye: uye, db: db, fs: fs, cfg: cfg});
    };
  });
};

module.exports.help = { name: "message" };