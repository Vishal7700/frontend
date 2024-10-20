import Cookies from 'js-cookie';

export const apiUrl = "http://localhost:3001";



export const getAxiosConfig = () => {
    const token = Cookies.get('token'); 
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};