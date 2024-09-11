const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs')
const commentsRouter = require('./comments')
const likesRouter = require('./likes.js')
const playlistsRouter = require('./playlists.js')
const searchRouter = require("./search.js")
// const playlistSongsRouter = require('./playlistSongs.js')
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/songs", songsRouter);

router.use("/comments", commentsRouter);

router.use("/likes", likesRouter)

router.use("/playlists", playlistsRouter)

router.use("/search", searchRouter)

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

module.exports = router;