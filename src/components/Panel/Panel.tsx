import React, { useEffect, useState } from 'react'
import LoadingSpinner from './../LoadingSpinner/LoadingSpinner'
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
        getAllTestimonialsApi.getTestimonials().then((response: AxiosResponse<TestimonialsData[]>) => {
            setData(response.data)
        });
    }, []);

    function setList(event: any) {
        if (event.target.innerText === 'Grid') {
            setIsList (false);
        } else {
            setIsList (true);
        }
    }

    const toggleButtons = 
                <>
                <button className={`${!isList ? "disabled-button" : ''}`} disabled={!isList} onClick={setList}><span>Grid</span></button>
                <button className={`${isList ? "disabled-button" : ''}`} disabled={isList} onClick={setList}><span>List</span></button>
                </>

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

    return (
        
        <div className='panel'>
            <div className='buttons-container'>
                {toggleButtons}
            </div>
            {data ? 
                <div className={`testimonials-container ${isList  ? 'isList' : ''}`}>
                    {renderTestimonials}
                </div>
                :
                <LoadingSpinner />
            }
        </div>
    )
}

export default Panel;