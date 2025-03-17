import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFilterUrl } from '../../utils';

const SearchBox = () => {

  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const {search} = useLocation();

  // useEffect(() => {
  //   if (!query) return;
  //   const filterURI = getFilterUrl(search, {query});
  //   navigate(filterURI);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[query]);

  const submitHandler = (e) => {
    e.preventDefault();
    if(query) {
      const filterURI = getFilterUrl(search, { query });
      navigate(filterURI);
    } else {
      navigate('/');
    }
  }

  return (
    <Form onSubmit={submitHandler} className='d-flex me-auto w-50'>
        <InputGroup>
            <FormControl 
              type='text' 
              placeholder='Search for products' 
              onChange={(e)=> setQuery(e.target.value)}/>
            <Button variant='warning' type='submit'>
                <i className='fas fa-search'></i>
            </Button>
        </InputGroup>
    </Form>
  )
}

export default SearchBox;