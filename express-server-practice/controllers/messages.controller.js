const path = require("path");

function getMessages(req, res) {
    res.sendFile(path.join(__dirname, "..", "public", "images", "sunset.jpg"));
}

function postMessage(req, res) {
    console.log("Post");
}

module.exports = {
    getMessages,
    postMessage,
};
