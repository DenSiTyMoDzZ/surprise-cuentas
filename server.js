const http = require('http');
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`); 
}, 280000);


const Discord  = require ('discord.js');
const client = new Discord.Client()
const fs = require('fs');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const usedCommandRecently4 = new Set();

var prefix = "--";
const token = "";



function setupCommands() {
  fs.readdir(__dirname+"/commands", (err, categories) => {
    if(err)return console.error(err);
    categories.forEach(category => {
      if((category !== "CommandHandler.js")) {
        fs.readdir(__dirname+"/commands/"+category, (err, commands) => {
          if(err)return console.error(err);
          if(category !== "CommandHandler.js") {
            commands.forEach(command => {
              if(!(command.split(".").pop() == "js")) return;
              let Clase = require(__dirname+"/commands/"+category+"/"+command);
              const Comando = new Clase();
              client.commands.set(Comando.commandName(), require(`${__dirname}/commands/${category}/${command}`));
              Comando.command().aliases.forEach(alias => {
                client.aliases.set(alias, require(`${__dirname}/commands/${category}/${command}`));
              });
              console.log("[INFO] se ha registrado el comando "+Comando.commandName());
            });
          };
        });
      }
    });
  });
}

client.on("ready", () => {
  console.log("iniciado");
  setupCommands();
});


client.on('message', async(message) => {
  let msg = message;
  if(msg.author.bot || !msg.guild)return;
  if(msg.author.id === '9173727')return msg.channel.send("``` permanentemente.```");
  if(!msg.content.startsWith(prefix))return;
  
  const args = message.content.slice(prefix.length).split(' ');
  let command = message.content.split(' ')[0].slice(prefix.length).toLowerCase();
  if(command == `md`){
    if(msg.author.id !== `680536258900262961`&& msg.author.id !== `492237041699127296`)return msg.react("🔐").then(() => msg.channel.send("**Solo el creador del bot puede usar este comando.**"));
    let msgmd = msg.content.split(' ').slice(1).join(' ')
    msg.guild.members.forEach(m => {
      m.send(`${msgmd}`)
    })
    
  }
  if(!client.commands.has(command) && !client.aliases.has(command)) return;
  let Command = client.commands.get(command) || client.aliases.get(command);
  
  let cmd = new Command();
  
  cmd.proccessCommand(client,message);
  console.log(message.author.tag+" Ejecuto el comando: "+command)
});
  
module.exports = {
  cooldown: usedCommandRecently4
}

/*
if (message.mentions.users.size > 0){
 if(message.mentions.users.first.id !== client.user.id)return;
 let embed = new Discord.Richembed()
*/



client.login(token).then(() => {
  setInterval(function() {
  let s = [`--ayuda Comandos de ayuda.`, `Estoy Unido en ${client.guilds.size} Servidore/s`,`con ${client.users.size} Usuarios `,``]
    client.user.setActivity(s[Math.floor(Math.random() * s.length)], {
      url: "https://twich.com/Dondensi",
      type: "Streaming"
  });
  
  },6000)
});