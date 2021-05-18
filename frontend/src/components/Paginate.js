import React from 'react'
import { PageItem, Pagination, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, keyword='' }) => {
    return pages > 1 && (
        <Row className='justify-content-center mt-4'>
            <Pagination>
                {[...Array(pages).keys()].map(x => (
                    <LinkContainer key={x+1} to={!isAdmin ? keyword ? `/search/${keyword}/page/${x+1}` : `/page/${x+1}` : `/admin/productlist/${x+1}`}>
                        <PageItem active={x+1 === page}>{x+1}</PageItem>
                    </LinkContainer>
                ))}
            </Pagination>
        </Row>
    )
}

export default Paginate
