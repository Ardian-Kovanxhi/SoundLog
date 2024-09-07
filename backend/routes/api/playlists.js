const express = require("express");
const { User, Playlist, PlaylistSong, Song } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");


/* 
GET ROUTES
-----------------------------------------------------------------------
all playlists
all user playlists
single playlist

POST a playlist
PUT (edit) a playlist
DELETE playlist

*/

const router = express.Router();

//GET /api/playlists | all playlists
router.get("/", async (req, res) => {
    const playlists = await Playlist.findAll({
        include: [
            { model: User, attributes: ["id", "username"] }
        ]
    });

    return res.json(playlists);
});

//auth true
//POST /api/playlists | create a playlist
router.post("/", requireAuth, async (req, res) => {
    const { name, coverImg } = req.body;

    const newPlaylist = await Playlist.create({
        userId: req.user.id,
        name,
        coverImg
    })

    res.statusCode = 201;
    return res.json(newPlaylist);
})


//GET /api/playlists/users/:userId | all playlists of user
router.get("/users/:userId", async (req, res) => {
    const userId = req.params.userId

    const userPlaylists = await Playlist.findAll({
        where: { userId },
        include: [
            { model: User, attributes: ["id", "username"] }
        ]
    })

    res.json(userPlaylists)
})

//GET /api/playlists/:playlistId | details of playlist by id
router.get("/:playlistId", async (req, res) => {
    const playlistId = +req.params.playlistId;

    const playlist = await Playlist.findByPk(playlistId, {
        attributes: { exclude: ["userId"] },
        include: [
            { model: User, attributes: ["id", "username"] },
            {
                model: PlaylistSong,
                attributes: ["id"],
                include: [{
                    model: Song,
                    attributes: [
                        "id",
                        "name",
                        "content",
                        "duration",
                        "img"
                    ],
                    include: [{ model: User, attributes: ["id", "username"] }]
                }]
            }
        ]
    })

    if (!playlist) {
        res.statusCode = 404;
        return res.status(404).send("Playlist couldn't be found");
    }

    return res.json(playlist)
})

//Auth true
//PUT /api/playlists/:playlistId | edit playlist
router.put("/:playlistId", requireAuth, async (req, res) => {
    const { name, coverImg } = req.body;

    const playlist = await Playlist.findByPk(+req.params.playlistId);

    if (!playlist) {
        res.statusCode = 404;
        return res.json({ message: "Playlist couldn't be found", statusCode: 404 });
    }

    playlist.name = name;
    playlist.coverImg = coverImg;
    await playlist.save();

    return res.json(playlist);
})

//Auth true
//DELETE /api/playlists/:playlistId | delete playlist
router.delete("/:playlistId", requireAuth, async (req, res) => {
    const playlistId = +req.params.playlistId;
    const playlist = await Playlist.findByPk(playlistId);

    if (!playlist) {
        res.statusCode = 404;
        return res.json({ message: "successfully deleted", statusCode: 404 });
    }

    await playlist.destroy();
    return res.json({ message: "successfully deleted", statusCode: 200 });
})

module.exports = router;