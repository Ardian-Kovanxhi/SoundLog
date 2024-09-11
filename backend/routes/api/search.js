const express = require("express");

const { Song, User, Playlist } = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router();

//GET /api/search | search for x
router.get("/", async (req, res) => {
    const sanatizedPhrase = `%${req.query.phrase}%`;
    const filter = req.query.filter;

    const results = {};

    if (filter === "songs" || !filter) {
        const song = await Song.findAll({
            attributes: ["id", "name"],
            where: {
                name: { [Op.like]: sanatizedPhrase }
            }
        })
        results.songs = song
    }
    if (filter === "users" || !filter) {
        const user = await User.findAll({
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
        results.users = user
    }
    if (filter === "playlists" || !filter) {
        const playlist = await Playlist.findAll({
            attributes: ["id", "name"],
            where: {
                name: { [Op.like]: sanatizedPhrase }
            }
        })
        results.playlsits = playlist
    }

    return res.json(results);
})

module.exports = router;