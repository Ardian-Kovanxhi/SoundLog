import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import './test.css'

export default function CommentTesting() {

    const history = useHistory()

    return (
        <>
            <div className='test404'>
                Page Not Found
                <div
                    className='redirect'
                    onClick={() => history.push('/')}
                >
                    Click Here To Return
                </div>
            </div>
            {/* https://aa-sounclod-clone-bucket.s3.amazonaws.com/1690097319856.mp3 */}
        </>
    )
}