const express = require("express");

const { Song, User, Playlist } = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router();

//GET /api/search | search for x
router.get("/", async (req, res) => {
    const sanatizedPhrase = `%${req.query.phrase}%`;
    const filter = req.query.filter;
    const test = req.query.test.split(",");
    console.log(test)
    const results = {};

    if (filter === "songs" || !filter) {
        const songs = await Song.findAll({
            attributes: ["id", "name"],
            where: {
                name: { [Op.like]: sanatizedPhrase }
            }
        })
        if (!results.songs) results.songs = [];
        results.songs.push(...songs)
    }
    if (filter === "users" || !filter) {
        const users = await User.findAll({
            attributes: ["id", ["username", "name"]],
            where: {
                [Op.and]: [
                    {
                        [Op.or]: [
                            { username: { [Op.like]: sanatizedPhrase } },
                            { firstName: { [Op.like]: sanatizedPhrase } },
                            { lastName: { [Op.like]: sanatizedPhrase } },
                        ],
                    },
                    { id: { [Op.ne]: 1 } }
                ]
            }
        })
        if (!results.users) results.users = []
        results.users.push(...users)
    }
    if (filter === "playlists" || !filter) {
        const playlists = await Playlist.findAll({
            attributes: ["id", "name"],
            where: {
                name: { [Op.like]: sanatizedPhrase }
            }
        })
        if (!results.playlists) results.playlists = [];
        results.playlists.push(...playlists)
    }

    return res.json(results);
})

module.exports = router;