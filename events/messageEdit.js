module.exports.help = { name: "messageUpdate" };

class MessageUpdate {
  constructor(oldMessage, newMessage, sunucu, cfg, client) {
    this.oldMessage = oldMessage;
    this.newMessage = newMessage;
    this.sunucu = sunucu;
    this.cfg = cfg;
    this.client = client;
  }
  
  static logla(kanal) {
  let messageLog = this.newMessage.guild.channels.cache.find(c => c.name === "message-log");
  if (this.newMessage.author.bot || this.newMessage.channel.type === "dm") return;
  if (this.newMessage.guild.id !== this.sunucu) return;
  if (this.oldMessage.content.toLowerCase() === this.newMessage.content.toLowerCase()) return;
  messageLog.send({
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
  
  async snipe(db) {
    
  }
  
  async getCommand(command) {
    
  }
}

module.exports.event = (oldMessage, newMessage) => {
  
};