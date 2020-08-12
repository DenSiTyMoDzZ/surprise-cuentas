const usedCommandRecently4 = require('/app/server').cooldown;
let fs = require('fs');

module.exports = class MovistarPeru extends require('../CommandHandler') {
  constructor() {
    super("movistarperu");
  }
  
  command() {
    return {
      aliases: ["genmovistarperu"],
      usage: "/"+this.name,
      arguments() {
        return {
          minArgs: 0,
          maxArgs: 0
        }
      },
      permissions() {
        return [];
      },
      run(client, msg, args) {
        const Discord = require('discord.js');
        let message = msg;
        if (usedCommandRecently4.has(message.author.id)){
        message.channel.send(require('/app/util').cooldown(Discord))
    } else{
        usedCommandRecently4.add(message.author.id)
        setTimeout(() =>{
            usedCommandRecently4.delete(message.author.id);
        }, 300000) //300000
    var string = fs.readFileSync('./accounts/movistarperu.txt', 'utf-8');
    if(string.length < 1)return msg.channel.send(new Discord.RichEmbed().setColor('RED').setDescription('Cuentas agotadas. Checker MovistarPeru Checkeando....'));
    message.channel.send(require('/app/util').account(client));
    var words = string.split('\n');
    let random = words[Math.floor(Math.random()*words.length)];
    let cuenta = random.split(':');
    let emb = new Discord.RichEmbed()
    .setTitle('__MovistarPeru__')
    .setColor('Cyan')
    .setFooter('Developed by DenSiTyMoDzZ#9081')
    .setDescription('**Correo**: '+cuenta[0]+'\n**Contraseña**: '+cuenta[1]+'\n\nCuenta entregada!')
    msg.member.send(emb);
     }
      }
    }
  }
  
}
