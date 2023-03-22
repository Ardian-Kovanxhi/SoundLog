const express = require('express');

const { User, Song, Comment } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

//Auth true
//GET /api/comments/current | Return all comments by a user
router.get('/current', requireAuth, async (req, res) => {
    const Comments = await Comment.findAll({
        where: { userId: req.user.id },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            {
                model: Song, attributes: [
                    'id',
                    'userId',
                    'songId',
                    'comment'
                ]
            }
        ]
    })

    res.json({ Comments })
})


//Auth true
//PUT /api/comments/:commentId | Edit comment
router.put('/:commentId', requireAuth, async (req, res) => {
    const commentId = +req.params.commentId;
    const commentObj = await Comment.findByPk(commentId);

    if (!commentObj) {
        res.statusCode = 404;
        return res.json({ message: "Comment couldn't be found", statusCode: 404 });
    }

    const { comment } = req.body;

    commentObj.comment = comment;
    await commentObj.save();

    return res.json(commentObj)
})

//Auth true
//DELETE /api/comments/:commentId | Delete Comment
router.delete('/:commentId', requireAuth, async (req, res) => {
    const commentId = +req.params.commentId;

    const comment = await Comment.findByPk(commentId);


    if (!comment) {
        res.statusCode = 404;
        return res.json({ message: "Comment not found", statusCode: 404 })
    }

    await comment.destroy();
    return res.json({ message: "successfully deleted", statusCode: 200 })
})

module.exports = router