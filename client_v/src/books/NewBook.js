import { useState } from "react";
import { toast } from "react-toastify";
import { Select, DatePicker } from 'antd';
import AlgoliaPlaces from 'algolia-places-react';
import moment from "moment";


const { Option } = Select;

const config = {
    appId: process.env.REACT_APP_ALGOLIA_APP_ID,
    apiKey: process.env.REACT_APP_ALGOLIA_APP_KEY,
    language: "en",
    countries: ["in"],

}

const NewBook = () => {
    // state
    const [values, setValues] = useState({
        title: "",
        content: "",
        author: "",   // c - local
        image: "",
        price: "",
        from: "",
        to: "",
        genre: "",        // c - debs
    });

    const [location, setLocation] = useState("");

    // default image
    const [preview, setPreview] = useState(
        "https://via.placeholder.com/100x100.png?text=PREVIEW"
    );

    // destructuring variables from state
    const { title, content, author, image, price, from, to, genre } = values;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(values);
        console.log(location);
    }

    // handle single image submit
    const handleImageChange = (e) => {
        // console.log(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));  // change preview
        setValues({ ...values, image: e.target.files[0] });  // change image
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };




    const bookForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="btn btn-outline-secondary btn-block m-2 text-left">
                    Image
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                        hidden
                    />
                </label>

                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder="Title"
                    className="form-control m-2"
                    value={title}
                />
                <input
                    type="text"
                    name="author"
                    onChange={handleChange}
                    placeholder="Author Name"
                    className="form-control m-2"
                    value={author}
                />

                <AlgoliaPlaces
                    className="form-control m-2"
                    placeholder="Location"
                    defaultValue={location}
                    options={config}
                    onChange={({ suggestion }) =>
                        setLocation(suggestion.value)}
                />

                <textarea
                    name="content"
                    onChange={handleChange}
                    placeholder="Content"
                    className="form-control m-2"
                    value={content}
                />

                <input
                    type="number"
                    name="price"
                    onChange={handleChange}
                    placeholder="Price"
                    className="form-control m-2"
                    value={price}
                />

                <input
                    type="text"
                    name="genre"
                    onChange={handleChange}
                    placeholder="Select a Genre"
                    className="form-control m-2"
                    value={genre}
                />

                {/* <Select defaultValue="Select a Genre" style={{ width: 220 }} onChange={handleChange} className="form-control m-2">
                    <Option name="selfHelp" value="selfHelp">Self-Help</Option>
                    <Option value="thriller">Thriller</Option>
                    <Option value="fiction" >
                        Fiction
                    </Option>
                    <Option value="horror" disabled>
                        Horror
                    </Option>
                    <Option value="realLife">Real-life</Option>
                </Select> */}

                <DatePicker
                    placeholder="From date"
                    className="form-control m-2"
                    onChange={(date, dateString) =>
                        setValues({ ...values, from: dateString })
                    }
                    disabledDate={(current) =>
                        current && current.valueOf() < moment().subtract(1, "days")
                    }
                />

                <DatePicker
                    placeholder="To date"
                    className="form-control m-2"
                    onChange={(date, dateString) =>
                        setValues({ ...values, to: dateString })
                    }
                    disabledDate={(current) =>
                        current && current.valueOf() < moment().subtract(1, "days")
                    }
                />


            </div>

            <button className="btn btn-outline-primary m-2">Save</button>
        </form>
    );

    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                Post a new book
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <br />
                        {bookForm()}
                    </div>
                    <div className="col-md-2">
                        <img
                            src={preview}
                            alt="preview_image"
                            className="img img-fluid m-2"
                        />
                        <pre>{JSON.stringify(values, null, 4)}</pre>
                        {JSON.stringify(location)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewBook;