const express = require('express');
const mm = import('music-metadata');

const { Song, User, Comment, Like } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');

const router = express.Router();


//GET /api/songs | all songs
router.get('/', async (req, res) => {
    const Songs = await Song.findAll({
        // attributes: ["id", "name", "coverImg"],
        include: [
            { model: User, attributes: ['id', 'username'] }
        ]
    });

    return res.json(Songs);
});

//auth true
//POST /api/songs | create a song
router.post('/', requireAuth, singleMulterUpload('content'), async (req, res) => {
    const { name, img, description } = req.body;
    const content = await singlePublicFileUpload(req.file);
    const audioBuffer = req.file.buffer
    const musicMetadataModule = await import('music-metadata');
    const metadata = await musicMetadataModule.parseBuffer(audioBuffer);
    const duration = Math.floor(metadata.format.duration)
    const userIdGrabber = req.user.id;

    const newSong = await Song.create({
        userId: userIdGrabber,
        name,
        content,
        duration,
        img,
        description
    })


    res.statusCode = 201;
    return res.json(newSong)
});



//GET /api/songs/user/:userId | all songs of a user
router.get('/user/:userId', async (req, res) => {

    const userId = +req.params.userId;

    const userSongs = await Song.findAll({
        where: { userId },
        include: [
            { model: User, attributes: ['id', 'username'] }
        ]
    })

    res.json(userSongs)
})
// //GET /api/songs/current | all songs of a user
// router.get('/current', requireAuth, async (req, res) => {
//     const userSongs = await Song.findAll({ where: { userId: req.user.id } })

//     res.json({ userSongs })
// })


//GET /api/songs/:songId  | details of a song by song Id
router.get('/:songId', async (req, res) => {
    const songId = +req.params.songId;

    const song = await Song.findByPk(songId, {
        // attributes: ["id", "name", "coverImg", "description", "duration"],
        include: [
            { model: User, attributes: ['id', 'username'] }
        ]
    });

    if (!song) {
        res.statusCode = 404;
        return res.status(404).send("Song couldn't be found")
    }

    return res.send(song)
})

//Auth true
//PUT /api/songs/:songId | edit song
router.put('/:songId', requireAuth, async (req, res) => {
    const { id, name, content, duration, img, description } = req.body;

    const song = await Song.findByPk(req.params.songId);

    if (!song) {
        res.statusCode = 404;
        return res.json({ message: "Song couldn't be found", statusCode: 404 })
    }

    song.id = id
    song.name = name
    song.content = content
    song.duration = duration
    song.img = img
    song.description = description
    await song.save();


    // const scoped = await Song.scope("songCreation").findByPk(song.id)

    // return res.json(scoped);
    return res.json(song);
})

//Auth true
// DELETE /api/songs/:songId | delete song
router.delete('/:songId', requireAuth, async (req, res) => {
    const songId = +req.params.songId;
    const song = await Song.findByPk(songId);

    if (!song) {
        res.statusCode = 404;
        return res.json({ message: "Song couldn't be found", statusCode: 404 });
    }

    await song.destroy();
    return res.json({ message: "successfully deleted", statusCode: 200 })
})


module.exports = router