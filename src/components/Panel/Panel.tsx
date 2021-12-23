import React, { useEffect, useState } from 'react'
import Testimonial from './../Testimonial/Testimonial';
import { TestimonialsData } from './../Testimonial/types';
import getAllTestimonialsApi from './../../api/testemonialsApi';
import './style.scss';
import { AxiosResponse } from 'axios';

export type DumyData = {
    name: string;
    age: number;
    location: string;
    comments: string;
};

const Panel: React.FC = () => {
    const [isList, setIsList] = useState(false);
    const [data, setData] = useState<TestimonialsData[]>();

    useEffect(() => {
        getAllTestimonialsApi.getTestimonials().then((r: AxiosResponse<TestimonialsData[]>) => {
            setData(r.data)
        });
    }, []);

    const renderTestimonials = data?.map((testimonial) => {
        return <Testimonial 
        key={testimonial.id}
        id={testimonial.id}
        name={testimonial.name} 
        age={testimonial.age}
        comments={testimonial.comments}
        video={testimonial.video}
        location={testimonial.location}
        isList={isList}
        />
    })

    function setList(event: any) {
        if (event.target.innerText === 'Grid') {
            setIsList (false);
        } else {
            setIsList (true);
        }
    }

    return (
        <div className='panel'>
            <div className='buttons-container'>
                <button className="grid-button" disabled={!isList} onClick={setList}><span>Grid</span></button>
                <button className="list-button" disabled={isList} onClick={setList}><span>List</span></button>
            </div>
            <div className={`testimonials-container ${isList  ? 'isList' : ''}`}>
                {renderTestimonials}
            </div>
        </div>
    )
}

export default Panel;