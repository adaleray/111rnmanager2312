const { Client } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const client = new Client({ disableMentions: "everyone", ignoreDirect: true, ignoreRoles: true });
const cfg = require("./config.json");

client.commands = new Map();
client.alias = new Map();

require("./functions.js")({client: client, cfg: cfg});

fs.readdir("./komutlar/", (err, files, komutlar = []) => {
  if (err) return console.log(err);
  console.log("--------------------------------");
  console.log(files.length + " komut yüklenecek.");
  files.filter(f => f.endsWith(".js")).forEach(file => {
    const prop = require(`./komutlar/${file}`);
    client.commands.set(prop.help.name, prop);
    prop.help.alias.forEach(alias => {
      client.commands.set(prop.help.alias, prop.help.name);
    });
  });
  for (var value of client.commands.values()) komutlar.push(value.help.name);
  console.log(komutlar.join(", ") + " isimli komut(lar) yüklendi.");
  console.log("--------------------------------");
});

client.on("message", async (msg) => {
  if (msg.guild.id !== cfg.sunucu || msg.author.bot || msg.channel.type === "dm") return;
  let prefM = new RegExp(` ^<@!${client.user.id}>`);
  let prefix = msg.content.match(prefM) ? msg.content.match(prefM)[0] : cfg.prefix;
});