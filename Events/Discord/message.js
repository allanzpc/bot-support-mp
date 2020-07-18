const Discord = require('discord.js');

module.exports = async(bot, message) => {

// Retourner les requêtes de bots
 if(message.author.bot) return;

 // Retourner les MP
 //if(message.channel.type == "dm") return;

 const votremsgok = new Discord.MessageEmbed()
   .setTitle("<:pin:731596389473058896> Information")
   .setDescription("Votre message à bien été reçu par notre équipe ! Nous vous recontacterons dès que possible !")
   .setTimestamp()
   .setColor("GREEN")
   .setFooter("Dev By Allan#4650")


 var embed_cote_staff = new Discord.MessageEmbed()
     .setAuthor(`${message.author.tag}`)
     .setDescription(message.content)
     .setColor("YELLOW")
     .setFooter("Dev By Allan#4650")
     .setTimestamp()
 
 if(!message.guild){
   if(message.author.bot) return;
   message.react("730869907381682277")
   /*console.log(message.content)
   console.log(message.author.id)*/
   /*var guildListe =
   console.log(guildListe)*/
   var guild = bot.guilds.cache.find(g => g.id === "730400660289355836")
   //console.log(guild)
   const STAFF = guild.roles.cache.find(role => role.name == 'Tickets')
   const everyone = guild.roles.everyone
   const yourchannel = guild.channels.cache.find(channel => channel.name === message.author.id)
   if(yourchannel === undefined) {
     

     //guild.channels.create(message.author.id, {type:"text",  reason: 'New channel added for fun!', parentID:"717682722243608666"})


    message.channel.send(votremsgok)
    var categoryID = guild.channels.cache.find(channel => channel.name == "Tickets" && channel.type == "category");
     if (!categoryID) {
         guild.channels.create('Tickets', { type: "category" }).then(category => {
             categoryID = category.id
         })
     } else {
         categoryID = categoryID.id
     }

     const created = guild.channels.create(message.author.id, "text").then(created => {

         created.setParent(categoryID).then((settedParent) => {
             settedParent.updateOverwrite(everyone, {
                 "VIEW_CHANNEL": false
             });

             settedParent.updateOverwrite(STAFF, {
                 "VIEW_CHANNEL": true,
                 "MANAGE_MESSAGES": true
             })
     })
     created.send(embed_cote_staff)
     
     })


 }else{yourchannel.send(embed_cote_staff)}}
 
 try{
 
 const user = message.guild.members.cache.get(message.channel.name)
 
 if(user != undefined){
     if(!message.content.startsWith("close")){

     	var embed_cote_client = new Discord.MessageEmbed()
            .setTitle("<a:notif:733760343435903099> Notification - Support")
     		.setDescription("Vous venez de recevoir une réponse de notre support.")
     		.setColor("BLUE")
     		.addField("Voici la réponse :", message.content)
     		.setTimestamp()
     		.setFooter(message.author.tag , message.author.displayAvatarURL())
     	message.react("733760285722017882")
     	user.send(embed_cote_client)
         		
              }
             if(message.content.startsWith("close")){
             	const closeEmbed = new Discord.MessageEmbed()
             		.setTitle("<:pin:731596389473058896> Information")
             		.setDescription("Votre ticket d'aide est maintenant fermé. N'hésitez surtout pas à nous recontacter si vous avez d'autres questions.")
             		.setColor("RED")
             		.setTimestamp()
                .setFooter("Dev By Allan#4650")
                 user.send(closeEmbed)
                 message.channel.delete()
         }}
     

 }catch{}
}