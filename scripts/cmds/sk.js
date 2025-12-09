const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
	config: {
		name: "sk",
		version: "1.0",
		author: "siyam8881",
		countDown: 5,
		role: 0,
		shortDescription: "sarcasm",
		longDescription: "Responds with random media when someone says 'acs",
		category: "reply",
	},

	onStart: async function () {},

	onChat: async function ({ event, message }) {
		if (event.body && event.body.toLowerCase() === "sk") {
			const mediaLinks = [
				"https://files.catbox.moe/tmat0a.mp4",
				"https://files.catbox.moe/pvhv3i.mp4",
				"https://files.catbox.moe/n5n6rb.mp4",
				"https://files.catbox.moe/tmat0a.mp4",
				"https://files.catbox.moe/tmat0a.mp4",
				"https://files.catbox.moe/dw8cq7.mp4",
				"https://files.catbox.moe/tmat0a.mp4",
				"https://files.catbox.moe/tmat0a.mp4",
				"https://files.catbox.moe/hcpiyf.mp4",
				"https://files.catbox.moe/tmat0a.mp4"
			];

			const randomLink = mediaLinks[Math.floor(Math.random() * mediaLinks.length)];
			const fileName = path.basename(randomLink);
			const filePath = path.join(__dirname, fileName);

			try {
				const response = await axios.get(randomLink, { responseType: "arraybuffer" });
				fs.writeFileSync(filePath, Buffer.from(response.data));

				await message.reply({
					body: "- 👀💚🪄",
					attachment: fs.createReadStream(filePath)
				});
			} catch (err) {
				console.error("Failed to fetch media:", err.message);
				await message.reply("Sorry, couldn't load the media.");
			} finally {
				fs.unlink(filePath, () => {});
			}
		}
	}
};
