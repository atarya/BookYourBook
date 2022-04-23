import { userSelector, useSelector, useStore } from "react-redux";

const Home = () => {
    const State = useSelector((state) => ({ ...state }));
    return (
        <div className="container-fluid h1 p-5 text-center">
            Home Page {JSON.stringify(State)}
        </div>
    );
};

export default Home;
