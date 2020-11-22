module.exports.help = { name: "messageDelete" };

class MessageDelete {
  constructor(msg, sunucu) {
    this.msg = msg;
    this.sunucu = sunucu;
  }
  
  logla(kanal) {
    if (this.msg.author.bot || this.msg.channel.type === "dm") return;
    if (this.msg.guild.id !== this.sunucu) return;
    if (this.msg.attachments.first()) {
      kanal.send({
        embed: {
          description:
            this.msg.channel +
            " kanalında " +
            this.msg.author +
            " tarafından bir fotoğraf silindi. \n Silinen Fotoğraf : ",
          footer: {
            text: "Silindiği Saat:"
          },
          timestamp: new Date(),
          author: {
            name: this.msg.author.tag,
            icon_url: this.msg.author.avatarURL
          },
          thumbnail: {
            url: this.msg.author.avatarURL
          },
          image: {
            url: this.msg.attachments.first().proxyURL
          },
          color: Math.floor(Math.random() * (0xffffff + 1))
        }
      });
    } else {
      kanal.send({
        embed: {
          color: Math.floor(Math.random() * (0xffffff + 1)),
          footer: {
            text: "Silindiği Saat:"
          },
          timestamp: new Date(),
          author: {
            name: this.msg.author.tag,
            icon_url: this.msg.author.avatarURL
          },
          thumbnail: {
            url: this.msg.author.avatarURL
          },
          description:
            this.msg.channel.name +
            " kanalında <@" +
            this.msg.author +
            "> tarafından bir mesaj silindi. \n\n Silinen Mesaj : " +
            this.msg.content
        }
      });
    };
  }
  
  snipe(db) {
    db.set(`snipe_${this.sunucu}`, this.msg.content);
  }
}

module.exports.event = (msg, { sunucu } = require("../config.json"), db = require("quick.db")) => {
  new MessageDelete(msg, sunucu).logla(msg.guild.channels.cache.find(c => c.name === "message-log"));
  new MessageDelete(msg, sunucu).snipe(db);
};