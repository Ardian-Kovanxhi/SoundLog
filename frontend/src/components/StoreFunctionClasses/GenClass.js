import { getCommentsBySong } from "../../store/comments";
import { getLoad } from "../../store/global";
import { getAllSongLikes, getAllUserLikes } from "../../store/likes";
import { getUser } from "../../store/session";
import { getSongs, clearSongStore, getSong, getUserSongs } from "../../store/songs";

export default class GenClass {

    //Used in useEffect
    static async fetchData(dispatch, page) {
        await dispatch(getLoad(true))
        await dispatch(getSongs(page))
        await dispatch(clearSongStore())
        await dispatch(getLoad(false))
    }

    static async singleRedirect(singleId, dispatch, history) {
        await dispatch(getLoad(true));
        history.push(`/songs/${singleId}`);
    }

    //pre-loads data for user page
    static async userRedirect(userId, history) {
        // await dispatch(getLoad(true));
        const hexId = await eval((userId + 79) * 7678831).toString(16);
        history.push(`/users/${hexId}`);
    }
}