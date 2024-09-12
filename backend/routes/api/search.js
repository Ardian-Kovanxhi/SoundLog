const express = require("express");

const { Song, User, Playlist } = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router();

//GET /api/search | search for x
router.get("/", async (req, res) => {
    const keywords = req.query.phrase.split(" ");
    const filter = req.query.filter;
    const results = {};

    for (let keyword of keywords) {

        const sanitizedPhrase = `%${keyword}%`;

        if (filter === "songs" || !filter) {
            const songs = await Song.findAll({
                attributes: ["id", "name", "coverImg"],
                include: [{ model: User, attributes: ["username"] }],
                where: {
                    [Op.or]: [
                        { name: { [Op.like]: sanitizedPhrase } },
                        { '$User.username$': { [Op.like]: sanitizedPhrase } },
                        { '$User.firstName$': { [Op.like]: sanitizedPhrase } },
                        { '$User.lastName$': { [Op.like]: sanitizedPhrase } }
                    ]
                }
            })
            if (!results.songs) results.songs = {};
            songs.forEach(el => results.songs[el.dataValues.name] = el)
        }

        if (filter === "users" || !filter) {
            const users = await User.findAll({
                attributes: ["id", ["username", "name"]],
                where: {
                    [Op.and]: [
                        {
                            [Op.or]: [
                                { username: { [Op.like]: sanitizedPhrase } },
                                { firstName: { [Op.like]: sanitizedPhrase } },
                                { lastName: { [Op.like]: sanitizedPhrase } },
                            ],
                        },
                        { id: { [Op.ne]: 1 } }
                    ]
                }
            })
            if (!results.users) results.users = {}
            users.forEach(el => results.users[el.dataValues.name] = el)
        }

        if (filter === "playlists" || !filter) {
            const playlists = await Playlist.findAll({
                attributes: ["id", "name", "coverImg"],
                include: [{ model: User, attributes: ["username"] }],
                where: {
                    [Op.or]: [
                        { name: { [Op.like]: sanitizedPhrase } },
                        { '$User.username$': { [Op.like]: sanitizedPhrase } },
                        { '$User.firstName$': { [Op.like]: sanitizedPhrase } },
                        { '$User.lastName$': { [Op.like]: sanitizedPhrase } }
                    ]
                }
            })
            if (!results.playlists) results.playlists = {};
            playlists.forEach(el => results.playlists[el.dataValues.name] = el)
        }

    }

    return res.json(results);
})

module.exports = router;