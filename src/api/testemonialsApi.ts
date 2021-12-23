import axios, { AxiosResponse } from 'axios';
import { TestimonialsData } from '../components/Testimonial/types';

const getAllTestimonialsApi = {
    getTestimonials: async () : Promise<AxiosResponse<TestimonialsData[]>> => {
        try {
            return await axios.get('http://localhost:3001/testimonials');
        } catch (err: any) {
            return err['response']
        }
    },
    createTestimonial: async (testimonial : FormData): Promise<AxiosResponse> => {
        try {
            return await axios.post('http://localhost:3001/testimonials/', testimonial, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            });
        } catch (err: any) {
            return err['response']
        }
    },
}

export default getAllTestimonialsApi;