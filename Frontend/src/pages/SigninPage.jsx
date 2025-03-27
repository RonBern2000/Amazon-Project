import { useContext, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Store } from "../store";
import axios from "axios";
import { USER_SIGNIN } from "../actions";
import { toast } from "react-toastify";
import Container from 'react-bootstrap/Container';
import Title from "../components/shared/Title";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';

const SigninPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;

    const {search} = useLocation();
    const redirectInURL = new URLSearchParams(search).get('redirect');
    const redirect = redirectInURL ? redirectInURL : '/';

    const submitHandler = async(e) => {
        e.preventDefault();

        try {
            const {data} = await axios.post("/api/v1/users/signin", {
                email,
                password
            });

            dispatch({type: USER_SIGNIN, payload: data});
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate(redirect);
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    },[])

  return (
    <Container className="small-container">
        <Title title={'Sign-In'}/>
        <h1 className="my-3">Sign-In</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
                <Form.Label>Email: </Form.Label>
                <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>

            <div className="mb-3">
                <Button variant="warning" type="submit">Sign In</Button>
            </div>

            <div className="mb-3">
                New Customer?{" "}
                <Link to={`/signup?redirect=${redirect}`}>Create Your Account</Link>
            </div>
        </Form>
    </Container>
  )
}
export default SigninPage