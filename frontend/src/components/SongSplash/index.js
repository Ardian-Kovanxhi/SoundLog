import { usePage } from "../../context/Page";
import AllPlaylists from "./Playlists";
import AllSongs from "./Songs";

export default function SongSplash() {
    const { splashDisplay } = usePage();

    return (
        <>
            {
                splashDisplay ?
                    <AllSongs />
                    :
                    <AllPlaylists />
            }
        </>
    )
}