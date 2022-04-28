import axios from 'axios';

export const createBook = async (token, data) => {
    await axios.post(`${process.env.REACT_APP_API}/create-book`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

// no need, axios implemented directly to useEffect
// export const allBooks = async (data) => {
//     await axios.get(`${process.env.REACT_APP_API}/books`);
// }

export const diffDays = (from, to) => {
    const day = 24 * 60 * 60 * 1000;
    const start = new Date(from);
    const end = new Date(to);
    const difference = Math.round(Math.abs((start - end) / day));
    return difference;
};


export const sellerBooks = async (token) =>
    await axios.get(`${process.env.REACT_APP_API}/seller-books`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });


export const deleteBook = async (token, bookId) =>
    await axios.delete(`${process.env.REACT_APP_API}/delete-book/${bookId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
