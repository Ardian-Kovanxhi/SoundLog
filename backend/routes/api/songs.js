const express = require('express');

const { Song, User, Comment } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3')

const router = express.Router();


//GET /api/songs | all songs
router.get('/', async (req, res) => {

    const songs = await Song.findAll();

    res.json(songs);
});

//POST /api/songs | create a song
router.post(
    '/',
    requireAuth,
    singleMulterUpload('content'),
    async (req, res) => {
        // const { name, content, img, description } = req.body;
        const { name, img, description } = req.body;
        // const content = await singlePublicFileUpload(req.file.content);
        const content = await singlePublicFileUpload(req.file);
        console.log(content)
        const userIdGrabber = req.user.id;

        const newSong = await Song.create({
            userId: userIdGrabber,
            name,
            content,
            img,
            description
        })

        // const scoped = await Song.scope("songCreation").findByPk(newSong.id)

        res.statusCode = 201;
        // return res.json(scoped)
        return res.json(newSong)
    });



//GET /api/songs/current | all songs of a user
router.get('/current', requireAuth, async (req, res) => {
    const userSongs = await Song.findAll({ where: { userId: req.user.id } })

    res.json({ userSongs })
})


//GET /api/songs/:songId  | details of a song by song Id
router.get('/:songId', async (req, res) => {
    const songId = +req.params.songId;

    const Comments = await Comment.findAll({ where: { songId } });

    // const song = await Song.findByPk(songId)

    // const song = await Song.scope("songDetails").findByPk(songId, {
    const song = await Song.findByPk(songId, {
        include: [
            { model: User, attributes: ['id', 'username'] }
        ]
    });

    if (!song) {
        res.statusCode = 404;
        return res.json({ message: "Song couldn't be found", statusCode: 404 })
    }

    return res.send(song)
})

//PUT /api/songs/:songId | edit song
router.put('/:songId', requireAuth, async (req, res) => {
    const { name, img, description } = req.body;

    const song = await Song.findByPk(req.params.songId);

    if (!song) {
        res.statusCode = 404;
        return res.json({ message: "Song couldn't be found", statusCode: 404 })
    }

    song.name = name
    song.img = img
    song.description = description
    await song.save();


    // const scoped = await Song.scope("songCreation").findByPk(song.id)

    // return res.json(scoped);
    return res.json(song);
})


//Auth false
//GET /api/songs/:songId/comments | Get comments of a song
router.get('/:songId/comments', async (req, res) => {
    const songId = +req.params.songId;

    const song = await Song.findByPk(songId);

    if (!song) {
        res.statusCode = 404;
        return res.json({ message: "Song couldn't be found", statusCode: 404 })
    }

    const comments = await Comment.findAll({
        where: { songId },
        include: [
            { model: User, attributes: ['id', 'username'] }
        ]
    })

    return res.json({ comments });
})

//Auth true
//POST /api/songs/:songId/comments | Make a comment for a song
router.post('/:songId/comments', requireAuth, async (req, res) => {
    const { comment } = req.body;
    const userId = req.user.id;
    const songId = +req.params.songId
    const song = await Song.findByPk(songId);

    if (!song) {
        res.statusCode = 404;
        return res.json({ message: "Song couldn't be found", statusCode: 404 });
    }


    const newComment = await Comment.create({
        userId,
        songId: +req.params.songId,
        comment
    })

    res.statusCode = 201;
    res.json(newComment);
})


//Auth true
// DELETE / api / songs /: songId
router.delete('/:songId', requireAuth, async (req, res) => {
    const songId = +req.params.songId;
    const song = await Song.findByPk(songId);

    if (!song) {
        res.statusCode = 404;
        return res.json({ message: "Song couldn't be found", statusCode: 404 });
    }

    // if (song.ownerId !== +req.user.id) {
    //     res.statusCode = 400;
    //     return res.json({ message: "non owner cannot delete song", statusCode: 400 });
    // }

    await song.destroy();
    return res.json({ message: "successfully deleted", statusCode: 200 })
})


module.exports = router