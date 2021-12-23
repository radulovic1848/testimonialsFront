import { AxiosResponse } from 'axios';
import React, { useState } from 'react'
import getAllTestimonialsApi from '../../api/testemonialsApi';
import TextInput from './../TextInput/TextInput'
import './style.scss';

type State = {
    name: string;
    age: string;
    location: string;
    comments: string;
    image: File | undefined;
};

const Form: React.FC = () => {

    const [state, setState] = useState<State>({
        name: '',
        age: '',
        location: '',
        comments: '',
        image: undefined
    });

    function handleInputChange(
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
    ) {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    }

    function handleFileInput(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]){
            setState({
                ...state,
                image: event.target.files[0],
            });
        }
    }

    function submitTheForm() {
        const imageOrEmpty = state.image ? state.image : '';
        const testimonial = new FormData();
        testimonial.append('name', state.name)
        testimonial.append('age', state.age)
        testimonial.append('comments', state.comments)
        testimonial.append('location', state.location)
        testimonial.append('image', imageOrEmpty)
        
        getAllTestimonialsApi.createTestimonial(testimonial).then((r: AxiosResponse) => {
            if (r && r.status === 200) {
                window.location.reload();
                return r;
            }
        });
    }
    
    return (
        <div className='form-wrapper'>
            <h3>Add Your Voice</h3>
            <TextInput id='text-input' fieldname='name' placeholder='Your Name' onChange={handleInputChange}/>
            <TextInput id='text-input' fieldname='age' placeholder='Your Age' onChange={handleInputChange}/>
            <TextInput id='text-input' fieldname='location' placeholder='Your Location' onChange={handleInputChange}/>
            <textarea placeholder='Your Comnent' name='comments' onChange={handleInputChange}></textarea>
            <label htmlFor="file-upload" className="custom-file-upload">
                <span>{state.image ? "Your photo is uploaded" : "Upload your photo"}</span>
                <input
                    id='file-upload'
                    className='file-input'
                    type="file"
                    name="file"
                    accept=".jpg, .png"
                    onChange={handleFileInput}
                />
            </label>
            <button className='submit-button' type="submit" onClick={submitTheForm}><span>Submit</span></button>
        </div>
    )
}

export default Form;