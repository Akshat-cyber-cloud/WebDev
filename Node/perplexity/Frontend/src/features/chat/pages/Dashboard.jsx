import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUser } from "../../auth/auth.slice";

const Dashboard = () => {
    const user = useSelector(state => state.auth);
    console.log(user);

    return (
        <>
        Dashboard
        </>
    );
};

export default Dashboard