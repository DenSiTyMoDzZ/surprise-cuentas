const {RichEmbed} = require('discord.js');
module.exports = {
  cooldown: function() {
    let embed = new RichEmbed()
    .setColor('RED')
    .setDescription("⚠️ Por favor espera 5 minutos para seguir generando.");
    return embed;
  },
  account: function(client, msg) {
    var user;
    if(msg) {
      user = msg.author + ", ";
    }else{
      user = '';
    }
    let embed = new RichEmbed()
    .setColor('RANDOM')
    .setTitle("**Cuenta entregada.**")
    .setDescription(user+"**Cuenta entregada al MD**.")
    .setThumbnail(client.user.displayAvatarURL)
    .setFooter("Developed by: DenSiTyMoDzZ#9081")
    return embed;
  }
}

