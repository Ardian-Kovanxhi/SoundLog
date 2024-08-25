// import { usePage } from "../../context/Page";
// import { getCommentsBySong } from "../../store/comments";
// import { getLoad } from "../../store/global";
// import { getAllSongLikes, getAllUserLikes } from "../../store/likes";
// import { getUser } from "../../store/session";
import { getSongs, clearSongStore, /*getSong, getUserSongs*/ } from "../../store/songs";


export default class GenClass {

    //Used in useEffect
    static async fetchData(dispatch, page, setLoadState) {
        await setLoadState(true)
        await dispatch(getSongs(page))
        await dispatch(clearSongStore())
        await setLoadState(false)
    }

    static async singleRedirect(singleId, dispatch, history, setLoadState) {
        await setLoadState(true);
        history.push(`/songs/${singleId}`);
    }

    //pre-loads data for user page
    static async userRedirect(userId, history) {
        // await dispatch(getLoad(true));
        // eslint-disable-next-line no-eval
        const hexId = await eval((userId + 79) * 7678831).toString(16);
        history.push(`/users/${hexId}`);
    }
}