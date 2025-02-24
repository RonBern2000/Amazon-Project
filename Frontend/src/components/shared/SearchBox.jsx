import React from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

const SearchBox = () => {
  return (
    <Form onSubmit={()=>{}} className='d-flex me-auto w-50'>
        <InputGroup>
            <FormControl type='text' placeholder='Search for products' onChange={()=>{}}/>
            <Button variant='warning' type='submit'>
                <i className='fas fa-search'></i>
            </Button>
        </InputGroup>
    </Form>
  )
}

export default SearchBox