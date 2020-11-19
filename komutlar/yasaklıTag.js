module.exports.execute = async ({client, msg, author, args, db, cfg}) => {
  if (!cfg.sahipler.includes(author.id)) return;
  
  let type = args[0].toLowerCase();
  
  if (type === "rol-ekle") {
    
  } else if (type === "rol-sil") {
    
  } else if (type === "tag-ekle") {
    
  } else if (type === "tag-sil") {
    
  };
  
};

module.exports.help = {
  name: "yasaklıtag",
  alias: []
};