module.exports = class Help extends require('../CommandHandler') {
  constructor() {
    super("help");
  }
  
  command() {
    return {
      aliases: ["ayuda", "ayudame"],
      usage: "!"+this.name,
      arguments() {
        return {
          minArgs: 0,
          maxArgs: -1
        }
      },
      permissions() {
        return [];
      },
      run(client, msg, args) {
        const Discord = require('discord.js');
        const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor(client.user.username+" | Ayuda", client.user.displayAvatarURL)
        .setDescription("Hola, Soy Surprise Cuentas v1.0")
        .addField("__**Próximamente**__",  "**Nuevas cosas estan por venir. :D**", true)
        .addField("__**Última Actualización**__",  "**09/08/2020**", true)
        .addField("**Invita a tus amigos**", "[Click aquí](https://discord.gg/NAAKvcb)")
        .setFooter('Developed by DenSiTyMoDzZ#9081')
        msg.channel.send(embed);
        
        
      }
    }
  }
}

