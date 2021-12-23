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
    const [validForm, setValidForm] = useState<Boolean>(true);

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
            setValidForm(true)
        }
    }

    function submitTheForm() {
        if (state.image === undefined) {
            setValidForm(false)
            return
        }
        const imageOrEmpty = state.image ? state.image : '';
        const testimonial = new FormData();
        testimonial.append('name', state.name)
        testimonial.append('age', state.age)
        testimonial.append('comments', state.comments)
        testimonial.append('location', state.location)
        testimonial.append('image', imageOrEmpty)
        
        getAllTestimonialsApi.createTestimonial(testimonial).then((response: AxiosResponse) => {
            if (response && response.status === 200) {
                window.location.reload();
                return response;
            }
        });
    }

    function removePhoto() {
        setState({
            ...state,
            image: undefined,
        });
    }

    const renderFileUpload =
    <>
        <label htmlFor="file-upload" className="custom-file-upload">
            <span>{state.image ? "Your photo is uploaded!" : "Upload your photo"}</span>
            <input
                id='file-upload'
                className='file-input'
                type="file"
                name="file"
                accept=".jpg, .png"
                onChange={handleFileInput}
            />
        </label>
    </>
    
    return (
        <div className='form-wrapper'>
            <h3>Add Your Voice</h3>
            <TextInput id='text-input' fieldname='name' placeholder='Your Name' onChange={handleInputChange}/>
            <TextInput id='text-input' fieldname='age' placeholder='Your Age' onChange={handleInputChange}/>
            <TextInput id='text-input' fieldname='location' placeholder='Your Location' onChange={handleInputChange}/>
            <textarea placeholder='Your Comment' name='comments' onChange={handleInputChange}></textarea>
            {renderFileUpload}
            <span className={`warning-info ${validForm ? 'valid' : ''}`}>Upload your photo please.</span>
            <div className='buttons-container'>
                <button className='form-button' onClick={submitTheForm}><span>Submit</span></button>
                {state.image && <button className='form-button' onClick={removePhoto}><span>Remove photo</span></button>}
            </div>
        </div>
    )
}

export default Form;