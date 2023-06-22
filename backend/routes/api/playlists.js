const express = require('express');

const { Playlist } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

//GET /api/playlists/current | all playlists of a user
router.get('/current', requireAuth, async (req, res) => {
    const userLists = await Playlist.findAll({ where: { userId: req.user.id } })

    res.json({ userLists })
})

//GET /api/playlists/:playlistId  | details of a playlist by playlist Id
router.get('/:playlistId', async (req, res) => {
    const playlistId = +req.params.playlistId;

    const Comments = await Comment.findAll({ where: { playlistId } });

    // const song = await Song.findByPk(songId)

    // const song = await Song.scope("songDetails").findByPk(songId, {
    const playlist = await Playlist.findByPk(playlistId, {
        include: [
            { model: User, attributes: ['id', 'username'] }
        ]
    });

    if (!playlist) {
        res.statusCode = 404;
        return res.json({ message: "Playlist couldn't be found", statusCode: 404 })
    }

    return res.send(song)
})