import PlayPauseBtn from "../../Global/AudioUtils/play-pause-btn";
import "./PlaylistSongs.scss"

export default function PlaylistSongs({ PlaylistSongs }) {
    return (
        <ul
            style={{
                display: "flex",
                flexDirection: "column",
                padding: "0px 40px"
            }}>
            {PlaylistSongs ? PlaylistSongs.map((el, index) => (
                <div className="playlistSong-container" key={`playlistSong${index}`}>
                    <img src={el.Song.coverImg} alt="song cover img" style={{ width: "40px", height: "40px" }} />
                    <div className="playlist-name-div">
                        {el.Song.name}
                    </div>
                    <PlayPauseBtn songId={el.Song.id} classTag={"playlist-test-class"} />
                </div>
            )) : ""}
        </ul>
    )
}