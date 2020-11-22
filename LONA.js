const { Client } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const client = new Client({ disableMentions: "everyone", ignoreDirect: true, ignoreRoles: true });
const cfg = require("./config.json");

client.commands = new Map();
client.aliases = new Map();
client.cezalilar = new Set();
client.cmuteliler = new Set();
global.client = client;

require("./data/functions.js")(client, cfg);
require("./data/load.js")(fs, client);
require("./data/commandHandler.js")(fs, client);
require("./data/login.js")(client, cfg);

client.xd = [
  "Nefes alıp veriyoruz hepimizin sorunu başka...",
  "Karışık duygularıma kör düğüm atarım...",
  "Kahverengi gözlerin var ama gökyüzü gibi bakıyosun.",
  "Herkes merak içinde ölümden sonra hayat var mı diye boşuna düşünürler sanki hayat varmış gibi ölümden önce.",
  "Güne açan çiçekler gibiyiz, yalaaaaaaaaaaağn",
  "Başka bir yer varsa orada tekrar görüşürüz belki yoksa da seni tanımak benim cennetimdi zaten.",
  "Bir gün gelir aşk biter, insafsızca terk eder. Bütün bunların ardından sadece gözyaşı kalır.",
  "Havam bozulmaya başladı yine. Gözlerim de dolmaya. Sanırım içimde bir yerlere sen yağdı gece gece...",
  "Yalanlarımız güzel, inanması zevkli.",
  "Çık hücrenden, ruhunu göster",
  "Hiç bir melek ölmez ama sen bi kere dirilmedin.",
  "Klasik oldu ama her şeye rağmen hayattayız yanımızda hatalarımız.",
  "Niye küstahça bakışlara sabır ediyorum?",
  "Silgiyle iz bıraktın, kalemle silinmedin.",
  "Amacım kötü değil, istiyordum yardım ama dönülmez akşamların ufkunda kaldım",
  "Hayattan ne istediğimi bilmiyorum aslında...",
  "Sokiyim böyle dünyaya...",
  "Her şeyi bilen sen. Bilemedin bir beni",
  "Her şeyi gören sen. Göremedin mi beni?",
  "Her şeyi duyan sen. Duyamadın mı beni?",
  "Ben olmasam bile hayat gülsün sana.", 
  "Prensese benim ol dedikçe daha çok uzaklaştı.",
  "Tanrıyı cenneten gelip bizi kurtarmadığı için suçlamıyorum, çünkü hiçbir şeyi hak etmiyoruz.","Senin olanın yokluğu, bir alev gibi yaktı mı hiç seni?"
];