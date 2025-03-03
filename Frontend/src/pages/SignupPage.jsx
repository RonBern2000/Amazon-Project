import React, { useContext, useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {Store} from '../store'
import axios from 'axios';
import { USER_SIGNIN } from "../actions";
import { Container, Form } from 'react-bootstrap';
import Title from '../components/shared/Title';
import Button from 'react-bootstrap/Button';

const SignupPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const [state, dispatch] = useContext(Store);

    const submitHandler = async(e)=>{
        e.preventDefault();
        try{
            const {data} = await axios.post('/api/v1/users/signup', {name, email, password});

            dispatch({type: USER_SIGNIN, payload: data});
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/");
        }catch(error){
            console.log(error?.response?.data?.message);
        }
        
    }

    const passwordDisplay = !password || !confirmPassword
     ? {isMatch: false} 
     : password !== confirmPassword 
     ? {className: "text-danger", message: "Passwords do not match", isMatch: false} 
     : {className: "text-success", message: "Passwords match", isMatch: true};

  return (
    <Container className='small-container'>
        <Title title={"Signup"}></Title>
        <h1 className='my-3'>Sign up</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='name'>
                <Form.Label>Name:</Form.Label>
                <Form.Control type='text' required onChange={(e)=> setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email:</Form.Label>
                <Form.Control type='email' required onChange={(e)=> setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='password'>
                <Form.Label>Password:</Form.Label>
                <Form.Control type='password' required onChange={(e)=> setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='confirmPassword'>
                <Form.Label>Conform Password:</Form.Label>
                <Form.Control type='password' required onChange={(e)=> setConfirmPassword(e.target.value)}/>
            </Form.Group>

            <div className='mb-3'>
                <Button type="submit" disabled={!passwordDisplay.isMatch} variant='warning'>Sign up</Button>
                <div className={passwordDisplay.className}>
                    {passwordDisplay.message}
                </div>
            </div>
            <div className='mb-3'>
                Already have an account? {" "}
                <Link to={"/signin"}>Sign in here</Link>
            </div>
        </Form>
    </Container>
  )
}

export default SignupPage