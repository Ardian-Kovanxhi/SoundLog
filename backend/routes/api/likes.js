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
                    'userId',
                    'songId',
                    'name',
                    'content'
                ]
            }
        ]
    })

    res.json({ Likes })
})