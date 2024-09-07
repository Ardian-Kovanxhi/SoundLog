const express = require("express");
const { User, Playlist, PlaylistSong, Song } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { where } = require("sequelize");

/* 
NEEDED ROUTES

GET ROUTES
-----------------------------------------------------------------------
all songs by playlist

POST a playlist song
DELETE a playlist song (delete from playlist but not db BUT deleted songs are removed from playlist)

*/

const router = express.Router();

//GET /api/playlistSongs/playlists/:playlistId | get songs by playlist ID
router.get("/playlists/:playlistId", async (req, res) => {
    const playlistId = +req.params.playlistId
    const playlistSongs = await PlaylistSong.findAll({
        where: { playlistId },
        include: [
            {
                model: Song,
                attributes: ["id", "name", "content", "img"],
                include: [{
                    model: User,
                    attributes: ["id", "username"]
                }]
            }
        ]
    })

    return res.json({ playlistSongs });
});

//Auth true
//POST /api/playlistSongs/songs/:hashedId
router.post("/songs/:hashedId", requireAuth, async (req, res) => {
    const idArr = req.hashedId.split("-");
    const userId = +req.user.id;
    const playlist = await Playlist.findByPk(+idArr[0]);
    if (!playlist) {
        res.statusCode = 404;
        return res.json({ message: "Playlist couldn't be found", statusCode: 404 })
    }

    if (userId !== 1 && userId !== playlist.userId) {
        return res.json({ message: "Unauthorized", statusCode: 401 });
    }

    const song = await Song.findByPk(+idArr[1]);
    if (!song) {
        return res.json({ message: "Song couldn't be found", statusCode: 404 });
    }

    const newPlaylistSong = await PlaylistSong.create({
        playlidId: idArr[0],
        songId: idArr[1]
    })

    res.statusCode = 201;
    return res.json(newPlaylistSong);
})

//Auth true
//DELETE /api/playlistSongs/:playlistSongId | delete playlist song
router.delete("/:playlistSongId", requireAuth, async (req, res) => {
    const userId = req.user.id;
    const psId = +req.params.playlistSongId;
    const playlistSong = await PlaylistSong.findByPk(psId, {
        include: [
            { model: Playlist, attributes: ["id", "userId"] }
        ]
    });

    if (!playlistSong) {
        return res.json({ message: "Playlist song not found", statusCode: 404 })
    }

    if (!playlistSong.Playlist) {
        return res.json({ message: "Playlist not found", statusCode: 404 })
    }

    if (userId !== 1 && userId !== playlistSong.Playlist.userId) {
        return res.json({ message: "Unauthorized", statusCode: 401 });
    }

    await playlistSong.destroy();
    return res.json({ message: "successfully deleted", statusCode: 200 });
})

module.exports = router;