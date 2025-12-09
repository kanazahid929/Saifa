const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "owner",
    author: "Tokodori", // Converted by GoatBot Mostakim
    role: 0,
    shortDescription: "Show owner information",
    longDescription: "Displays information about the bot owner along with a video.",
    category: "admin",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {
    try {
      const ownerInfo = {
        name: 'SAFIA ISLAM SARA',
        gender: 'Female💚🪄',
        nick: 'SARA👀🥺  '
      };

      const videoUrl = 'https://files.catbox.moe/y9cz32.mp4';
      const tmpFolderPath = path.join(__dirname, 'tmp');

      if (!fs.existsSync(tmpFolderPath)) {
        fs.mkdirSync(tmpFolderPath);
      }

      const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
      const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

      fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

      const response = `
╭────────────◊
├─⦿ 𝐁𝐨𝐭 & 𝐎𝐰𝐧𝐞𝐫 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 
├─⦿ 𝐍𝐚𝐦𝐞: ${ownerInfo.name}
AGE:17+
district:NARAYANGANJ 
COUNTRY :BANGLADESH 
RELIGION:ISLAM 
FB ID LINK: https://www.facebook.com/profile.php?id=61559922856622

Wish me 11 December 😊

├─⦿ 𝐆𝐞𝐧𝐝𝐞𝐫: ${ownerInfo.gender}
├─⦿ 𝐍𝐢𝐜𝐤 : ${ownerInfo.nick}
╰────────────◊
`;

      await api.sendMessage({
        body: response,
        attachment: fs.createReadStream(videoPath)
      }, event.threadID, event.messageID);

      api.setMessageReaction('🚀', event.messageID, (err) => {}, true);

    } catch (error) {
      console.error('Error in owner command:', error);
      return api.sendMessage('An error occurred while processing the command.', event.threadID);
    }
  }
};
