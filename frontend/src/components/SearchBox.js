import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const SearchBox = ({ history }) => {

    const [keyword, setKeyword] = useState('')


    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control className="mr-sm-2 ml-sm-5" type="text" name='q' placeholder="Search" onChange={(e) => setKeyword(e.target.value)} />
            <Button variant='secondary' type="submit">Search</Button>
        </Form>
    )
}

export default SearchBox

