const { ButtonInteraction } = require("discord.js");


module.exports = {
    
    customId : 'delete',

    /**
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction){
        interaction.reply("Button!");
    },
};