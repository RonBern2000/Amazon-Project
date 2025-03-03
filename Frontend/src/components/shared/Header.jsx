import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import NavBar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate();
  return (
    <header>
        <NavBar bg='dark' varient='dark'>
            <Container>
                {/* TODO: maybe I will implement proper logic (for going back)*/}
                <Link onClick={() => {navigate(-1)}}>
                    {location.pathname !== "/" && (
                        <i className='fas fa-arrow-left text-white align-arrow-right'>Back</i>
                    )}
                </Link>
                <LinkContainer to='/'>
                    <NavBar.Brand>
                        <img 
                            src='https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695'
                            width={80}
                            alt='amazon-pic'
                            ></img>
                    </NavBar.Brand>
                </LinkContainer>
                {" "}
                <SearchBox/>
                <nav className='d-flex align-items-center justify-content-end me-2 ms-4'>
                    <i className='fas fa-shopping-cart text-white'></i>
                </nav>
                <NavDropdown className='text-white' title='sign in'>
                    <LinkContainer className='me-2 ms-2 text-black nav-link' to='/signin'>
                        <NavDropdown.Item>Sign in</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider/>
                    <LinkContainer className='me-2 ms-2 text-black nav-link' to='/signup'>
                        <NavDropdown.Item>Sign up</NavDropdown.Item>
                    </LinkContainer>
                </NavDropdown>
            </Container>
        </NavBar>
    </header>
  )
}

export default Header