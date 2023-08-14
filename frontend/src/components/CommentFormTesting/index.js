import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { playSong404 } from '../../store/songs'
import { useDispatch } from 'react-redux'
import {
    useState,
    // useRef, useEffect 
} from 'react'
import './test.css'
// import { notInitialized } from 'react-redux/es/utils/useSyncExternalStore'

// function generateSoundwave(context, canvas, sampleRate, duration) {
//     const numSamples = sampleRate * duration;
//     const amplitude = 0.5;

//     const audioData = new Float32Array(numSamples);
//     for (let i = 0; i < numSamples; i++) {
//         const time = i / sampleRate;
//         audioData[i] = amplitude * Math.sin(2 * Math.PI * 440 * time); // 440 Hz sine wave
//     }

//     context.beginPath();
//     context.moveTo(0, canvas.height / 2);
//     for (let i = 0; i < numSamples; i++) {
//         const x = (i / numSamples) * canvas.width;
//         const y = (0.5 - audioData[i] / 2) * canvas.height;
//         context.lineTo(x, y);
//     }
//     context.lineTo(canvas.width, canvas.height / 2);
//     context.strokeStyle = 'black';
//     context.lineWidth = 1;
//     context.stroke();
// }

export default function CommentTesting() {
    // const canvasRef = useRef(null);

    // useEffect(() => {
    //     const canvas = canvasRef.current;
    //     const context = canvas.getContext('2d');

    //     const sampleRate = 44100;
    //     const duration = 5; // seconds

    //     generateSoundwave(context, canvas, sampleRate, duration);
    // }, []);

    // return (
    //     <div
    //         // className="App"
    //         style={{
    //             zIndex: '20'
    //         }}
    //     >
    //         <canvas
    //             ref={canvasRef}
    //             width={800}
    //             height={300}
    //             style={{
    //                 zIndex: '21'
    //             }}
    //         ></canvas>
    //     </div>
    // );
    const dispatch = useDispatch()
    const history = useHistory()

    const [easter, setEaster] = useState(false)

    const gifClass = 'test404 ' + (easter ? 'gif' : '')
    const btnClass = 'easter-btn ' + (easter ? 'gif' : '')

    return (
        <>
            <div className={gifClass}>
                filler

                <div className='info-div-404'>

                    <div>
                        ERROR 404
                    </div>

                    Page Not Found

                    <div
                        className='redirect'
                        onClick={() => history.push('/')}
                    >
                        🎵Return To The Jams🎵
                    </div>
                </div>


                <button
                    className={btnClass}
                    onClick={() => {
                        dispatch(playSong404('https://aa-sounclod-clone-bucket.s3.amazonaws.com/1690097319856.mp3'))
                        setEaster(true)
                    }}
                >
                    Click for an Easter Egg
                </button>

                <div style={{ visibility: 'hidden' }}>
                    filler2
                </div>
            </div>
            {/* https://aa-sounclod-clone-bucket.s3.amazonaws.com/1690097319856.mp3 */}
        </>
    )
}