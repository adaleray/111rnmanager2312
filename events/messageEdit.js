module.exports.help = { name: "messageUpdate" };

class MessageUpdate {
  constructor(oldMessage, newMessage, sunucu, client, cfg) {
    this.oldMessage = oldMessage;
    this.newMessage = newMessage;
    this.sunucu = sunucu;
    this.cfg = cfg;
    this.client = client;
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
  async getCommand(prefix, args, command) {
    if (!this.newMessage.toLowerCase().startsWith(prefix)) return;
    let cmd;
    let author = this.newMessage.guild.member(this.newMessage.author);
    let uye = this.newMessage.guild.member(this.newMessage.mentions.users.first());
    if (this.client.commands.has(command)) {
      cmd = this.client.commands.get(command);
    } else if (this.client.aliases.has(command)) {
      cmd = this.client.commands.get(this.client.aliases.get(command));
    };
    if (cmd) {
      cmd.operate({ client: this.client, msg: this.newMessage, args: args, author: author, uye: uye, cfg: this.cfg, db: require("quick.db") });
    };
  }
}

module.exports.event = (oldMessage, newMessage, { sunucu } = require("../config.json"), cfg = require("../config.json") ,client = global.client, db = require("quick.db")) => {
  let messageLog = newMessage.guild.channels.cache.find(c => c.name === "message-log");
  let prefixMention = new RegExp(`^<@!${client.user.id}>`);
  let pref = newMessage.content.match(prefixMention) ? newMessage.content.match(prefixMention)[0] : cfg.prefix.toLowerCase();
  if (!newMessage.content.toLowerCase().startsWith(cfg.prefix)) return;
  let args = newMessage.content.slice(cfg.prefix.length).trim().split(/ +/g);
  let command = args.shift().toLowerCase();
  new MessageUpdate(oldMessage, newMessage, sunucu, client).logla(messageLog);
  new MessageUpdate(oldMessage, newMessage, sunucu, client).getCommand(pref, args, command);
};