const friendsModel = require("../models/friends.model");

function getFriends(req, res) {
    res.json(friendsModel);
}

function getFriend(req, res) {
    const friendId = Number(req.params.friendId);
    const friend = friendsModel[friendId];
    if (friend) {
        res.status(200).json(friendsModel[friendId]);
    } else {
        res.status(404).json({
            error: "Friend does not exist",
        });
    }
}

function postFriend(req, res) {
    if (!req.body.name) {
        return res.status(400).json({
            error: "Missing friend name",
        });
    }

    const newFriend = {
        id: friendsModel.length,
        name: req.body.name,
    };

    friendsModel.push(newFriend);
    res.json(newFriend);
}

module.exports = {
    getFriends,
    getFriend,
    postFriend,
};
