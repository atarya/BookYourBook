import axios from 'axios';

export const createBook = async (token, data) => {
    await axios.post(`${process.env.REACT_APP_API}/create-book`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}