import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCommentsBySong, createComment, removeComment } from "../../store/comments";
// import { getSongs } from '../../store/songs';

import './test.css'

export default function CommentTesting() {

    return (
        <div className='test404'>
            page not found
        </div>
    )
}