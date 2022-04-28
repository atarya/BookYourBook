import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { diffDays, read } from '../actions/book';


const ViewBook = () => {
    const [book, setBook] = useState({});
    const [image, setImage] = useState("");

    const { auth } = useSelector((state) => ({ ...state }))

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadSellerBook();
        // console.log(params.bookid);
    }, []);


    const loadSellerBook = async () => {
        let res = await read(params.bookid);
        console.log(res);
        setBook(res.data);
        setImage(`${process.env.REACT_APP_API}/book/image/${res.data._id}`);
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (!auth) navigate("/login");
        console.log(
            "get session id from stripe to show a button ==+> checkout with stripe"
        );
    };

    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                <h1>{book.title}</h1>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <br />
                        <img src={image} alt={book.title} className="img img-fluid m-2" />
                    </div>
                    <div className="col-md-6">
                        <br />
                        <b>{book.content}</b>
                        <p className="alert alert-info mt-3">₹ {book.price}</p>
                        <p className="card-text">
                            <span className="float-right text-primary">
                                for {diffDays(book.from, book.to)}{" "}
                                {diffDays(book.from, book.to) <= 1 ? " day" : " days"}
                            </span>
                        </p>
                        <p>
                            Available From: <br />{" "}
                            {moment(new Date(book.from)).format("MMMM Do YYYY, h:mm:ss a")}
                        </p>
                        <p>
                            Return Till: <br />{" "}
                            {moment(new Date(book.to)).format("MMMM Do YYYY")}
                        </p>
                        <i><b>Posted by:</b> {book.postedBy && book.postedBy.name}</i>
                        <br />
                        <button
                            onClick={handleClick}
                            className="btn btn-block btn-lg btn-primary mt-3"
                        >
                            {auth && auth.token ? "Book Now" : "Login to Book"}

                        </button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ViewBook;