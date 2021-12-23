import React from 'react'
import './style.scss';

type Props = {
    id: number;
    name?: string;
    age?: number;
    location?: string;
    comments?: string;
    isList?: boolean;
    video?: string;
}

const Testimonial: React.FC<Props> = ({id, name, age, location, comments, video, isList}) => {

    const videoUrl = `http://localhost:3001/testimonialsVideo/${id}`;
    const imageUrl = `http://localhost:3001/testimonials/${id}`;

    return (
        <div className={`testemonial ${isList ? 'list-active' : ''}`}>
            <div className='imageOrVideoContainer'>
                {video && !isList ? <video src={videoUrl} id="videoPlayer" autoPlay muted loop/> : <img src={imageUrl} alt='altimage' />}
            </div>
            <div className='dataContainer'>
                <span>Name: {name}</span>
                <span>Age: {age}</span>
                <span>Location: {location}</span>
                <span>Comments: {comments}</span>
            </div>
        </div>
    )
}

export default Testimonial;