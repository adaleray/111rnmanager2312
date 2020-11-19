const { Client } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const client = new Client({ disableMentions: "everyone", ignoreDirect: true, ignoreRoles: true });
const cfg = require("./config.json");

client.commands = new Map();
client.aliases = new Map();
client.events = new Map();

require("./data/functions.js")({client: client, cfg: cfg});
require("./data/load.js")({fs: fs, client: client});
console.log(require("./data/commandHandler.js"));
/*
fs.readdir("./komutlar/", (err, files, komutlar = []) => {
  console.log("Komutlar Yükleniyor.");
  console.log("--------------------------------------");
  if (err) return console.log("Error var error " + err);
  console.log(files.length + " komut yüklenecek.");
  files.filter(f => f.endsWith(".js")).forEach(file => {
    let prop = require(`./komutlar/${file}`);
    client.commands.set(prop.help.name, prop);
    prop.help.alias.forEach(alias => {
      client.aliases.set(alias, prop.help.name);
    });
  });
  for (var value of client.commands.values()) komutlar.push(value.help.name);
  console.log("[" + komutlar.join(", ") + "]" + " isimli komut(lar) yüklendi.");
  console.log("--------------------------------------");
});
//******************************************************/
/*client.on("message", async (msg) => {
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
});*/