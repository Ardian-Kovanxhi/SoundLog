const express = require('express');

const { Like, User, Song } = require('../../db/models')
const { requireAuth } = require('../../utils/auth');

const router = express.Router();


//Auth true
//POST /api/likes/:songId | Make a Like for a song
router.post('/:songId', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const songId = +req.params.songId
    const song = await Song.findByPk(songId);

    if (!song) {
        res.statusCode = 404;
        return res.json({ message: "Song couldn't be found", statusCode: 404 });
    }


    const newLike = await Like.create({
        userId,
        songId: +req.params.songId,
        userSongHash: `${userId}-${songId}`
    })

    res.statusCode = 201;
    res.json(newLike);
})

//Auth true
//GET /api/likes/current | Return all likes by a user
router.get('/current', requireAuth, async (req, res) => {
    const Likes = await Like.findAll({
        where: { userId: req.user.id },
        include: [
            {
                model: Song
            }
        ]
    })
    return res.json({ Likes })
})

//Auth true
//GET /api/likes/current/:songId | Return single user like of a song
router.get('/current/:songId', requireAuth, async (req, res) => {
    const songId = +req.params.songId
    const userId = req.user.id;

    const song = await Song.findByPk(songId);

    if (!song) {
        res.statusCode = 404;
        return res.json({ message: "Song couldn't be found", statusCode: 404 })
    }

    const Likes = await Like.findOne({
        where: { songId: songId, userId: userId },
    })
    return res.json({ Likes })
})

//Auth false
//GET /api/likes/:songId | Return all likes of a song
router.get('/:songId', async (req, res) => {
    const songId = +req.params.songId
    const song = await Song.findByPk(songId);

    if (!song) {
        res.statusCode = 404;
        return res.json({ message: "Song couldn't be found", statusCode: 404 })
    }

    const Likes = await Like.findAll({
        where: { songId },
        // include: [
        //     { model: User, attributes: ['id', 'firstName', 'lastName'] },
        //     {
        //         model: Song, attributes: ['name']
        //     }
        // ]
    })
    return res.json({ Likes })
})

//Auth true
//DELETE /api/likes/:likeId | Delete Like
router.delete('/:likeId', requireAuth, async (req, res) => {
    const likeId = +req.params.likeId;

    const like = await Like.findByPk(likeId);


    if (!like) {
        res.statusCode = 404;
        return res.json({ message: "Like not found", statusCode: 404 })
    }

    await like.destroy();
    return res.json({ message: "successfully deleted", statusCode: 200 })
})

module.exports = router