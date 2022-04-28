import axios from "axios";
import { useState, useEffect } from "react";
import { allBooks } from "../actions/book";
import SmallCard from "../components/cards/SmallCard";



const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        loadAllbooks();
    }, []);

    const loadAllbooks = async () => {
        let { data } = await axios.get(`${process.env.REACT_APP_API}/books`);
        setBooks(data);
    };


    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                <h1>All Books</h1>
            </div>
            <div className="container-fluid">

                {/* <pre>{JSON.stringify(books, null, 4)}</pre> */}
                {books.map((b) => (<SmallCard key={b._id} b={b} />))}

            </div>
        </>
    );
};

export default Home;