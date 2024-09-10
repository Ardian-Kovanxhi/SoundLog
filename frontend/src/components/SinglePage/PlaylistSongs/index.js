import PlayPauseBtn from "../../Global/AudioUtils/play-pause-btn";

export default function PlaylistSongs({ PlaylistSongs }) {
    return (
        <ul
            style={{
                display: "flex",
                flexDirection: "column"
            }}>
            {PlaylistSongs ? PlaylistSongs.map((el, index) => (
                <div style={{ display: "flex" }} key={`playlistSong${index}`}>
                    <PlayPauseBtn songId={el.Song.id} />
                    <div>
                        {el.Song.name}
                    </div>
                </div>
            )) : ""}
        </ul>
    )
}