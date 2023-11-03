/* 
NEEDED ROUTES

GET ROUTES
-----------------------------------------------------------------------
all playlists
all user playlists
single playlist

POST a playlist
PUT (edit) a playlist
DELETE playlist

*/
const express = require('express');

const { Like, User, Song } = require('../../db/models')
const { requireAuth } = require('../../utils/auth');

const router = express.Router();


//Auth true
//GET /api/likes/current | Return all likes by a user
router.get('/current', requireAuth, async (req, res) => {
    const Likes = await Like.findAll({
        where: { userId: req.user.id },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            {
                model: Song, attributes: [
                    'id',
                    'name',
                    'content'
                ]
            }
        ]
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