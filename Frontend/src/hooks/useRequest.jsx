import { useEffect, useRef, useState } from "react"
import axios from 'axios';

export const useRequest = (url, options = {}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState(null);
    const optionsRef = useRef(options);

    useEffect(()=>{
        const fetchData = async()=>{
            setIsLoading(true);
            setError('');

            try {
                const response = await axios(url, optionsRef.current);
                setData(response.data);
            } catch (error) {
                setError(error?.response?.data?.message || 'Something went wrong');
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [url, optionsRef]);
    return {isLoading, error, data}
}