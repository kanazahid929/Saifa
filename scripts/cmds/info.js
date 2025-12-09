module.exports = {
  config: {
    name: "info",
    author: "Tokodori",
    role: 0,
    shortDescription: "Displays admin info",
    longDescription: "Shows info about the bot owner/admin",
    category: "admin",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {
    try {
      const message = `
NAME :SAFIA ISLAM SARA

AGE:17+

District:NARAYANGANJ 

COUNTRY :BANGLADESH 

RELIGION:ISLAM 

FB ID LINK: https://www.facebook.com/profile.php?id=61559922856622


Wish me 11 December 😊`;

      await api.sendMessage({
        body: message
      }, event.threadID, event.messageID);

      if (event.body.toLowerCase().includes('ownerinfo')) {
        api.setMessageReaction('🖤', event.messageID, (err) => {}, true);
      }

    } catch (error) {
      console.error('Error in ownerinfo command:', error);
      return api.sendMessage('Something went wrong while processing the command.', event.threadID);
    }
  },
};
