const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const asyncHandler = require("express-async-handler");
const {
    singleMulterUpload,
    singlePublicFileUpload,
    multipleMulterUpload,
    multiplePublicFileUpload,
} = require("../../awsS3");

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res) => {

    const { email, firstName, lastName, password, username } = req.body;
    const user = await User.signup({ email, firstName, lastName, username, password });

    await setTokenCookie(res, user);

    return res.json({
        user: user
    });
}
);

//get user by ID
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;

    const user = await User.scope("viewedUser").findByPk(userId);

    if (!user) {
        res.statusCode = 404;
        return res.json({ message: "User couldn't be found", statusCode: 404 })
    }

    return res.send(user)
})

//Edit user
router.put('/:userId', requireAuth, async (req, res) => {
    const userId = +req.params.userId;

    const { user } = req;

    const userObj = await User.findByPk(userId);

    if (!userObj) {
        res.statusCode = 404;
        return res.json({ message: "User couldn't be found", statusCode: 404 });
    } else if (userId !== user.dataValues.id) {
        const err = new Error('Edit failed');
        err.status = 401;
        err.title = 'Edit failed';
        err.errors = ['Invalid account '];
        return next(err);
    }

    const { data } = req.body;


})



// // Sign up
// router.post(
//     "/",
//     singleMulterUpload("image"),
//     validateSignup,
//     asyncHandler(async (req, res) => {
//         const { email, password, username } = req.body;
//         const profileImageUrl = await singlePublicFileUpload(req.file);
//         const user = await User.signup({
//             username,
//             email,
//             password,
//             profileImageUrl,
//         });

//         setTokenCookie(res, user);

//         return res.json({
//             user,
//         });
//     })
// );

// router.put(
//     "/:id",
//     singleMulterUpload("image"),
//     asyncHandler(async (req, res) => {
//         const id = req.params.id;
//         const profileImageUrl = await singlePublicFileUpload(req.file);
//         await User.update({ profileImageUrl }, { where: { id } });

//         res.json({ profileImageUrl });
//     })
// );

module.exports = router;