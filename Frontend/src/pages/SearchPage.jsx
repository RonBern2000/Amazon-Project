import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRequest } from '../hooks/useRequest';
import {toast} from 'react-toastify';
import Title from '../components/shared/Title';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from '../components/shared/Rating';
import Loading from '../components/shared/Loading';
import Messagebox from '../components/shared/Messagebox';
import { Button } from 'react-bootstrap';
import Product from "../components/home/Product";
import { LinkContainer } from "react-router-bootstrap";
import { getFilterUrl } from '../utils';

const prices = [
  {
    name: "$1 to $50",
    value: "1-50"
  },
  {
    name: "$50 to $200",
    value: "50-200"
  },
  {
    name: "$200 to $1000",
    value: "200-1000"
  }
];

const rates = [
  {
    name: "4 stars & up",
    rating: 4,
  },
  {
    name: "3 stars & up",
    rating: 3,
  },
  {
    name: "2 stars & up",
    rating: 2,
  },
  {
    name: "1 stars & up",
    rating: 1,
  }
];

const SearchPage = () => {

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const {search} = useLocation();

  const searchParams = new URLSearchParams(search);
  const category = searchParams.get('category') || 'all';
  const query = searchParams.get('query') || 'all';
  const price = searchParams.get('price') || 'all';
  const rating = searchParams.get('rating') || 'all';
  const order = searchParams.get('order') || 'newest';
  const page = searchParams.get('page') || 1;

  const orderFilterURI = getFilterUrl(search, {page}).split('?');

  const {isLoading: catLoading, error: catError, data: categoriesData} = useRequest('/api/vi/products/categories');

  useEffect(() => {
    if(categoriesData) setCategories(categoriesData);
    if(catError) toast.error(catError);
  },[catError, categoriesData]);

  const {isLoading, error, data: productData} = useRequest(`/api/v1/products/search?category=${category}&query=${query}&price=${price}&rating=${rating}&order=${order}&page=${page}`);

  const { products = [], pages = 1,  countProducts = 0} = productData || {};

  return (
    <div>
      <Title title={'Search Products'}/>
      <Row>
        <Col md={3}>
          <div>
            <h3>Category</h3>
            <ul>
              <li>
                <Link 
                  className={category === "all" ? "text-bold" : ""} 
                  to={getFilterUrl(search, {category: 'all'})}>All</Link>
              </li>
              {categories.map(c => (
                <li key={c}>
                  <Link 
                    className={c === category ? "text-bold" : ""} 
                    to={getFilterUrl(search, {category: c})}>
                      {c}
                    </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Prices</h3>
            <ul>
              {prices.map(p => {
                <li key={p.value}>
                  <Link className={p.value === price ? "text-bold" : ""} to={getFilterUrl(search, {price: p.value})}>{p.name}</Link>
                </li>
              })}
            </ul>
          </div>
          <div>
            <h3>Ratings</h3>
            <ul>
              {rates.map(r => {
                <li key={r.name}>
                  <Link className={r.rating === rating ? "text-bold" : ""} to={getFilterUrl(search, {rating: r.rating})}>
                    <Rating caption={" "} rating={r.rating}/>
                  </Link>
                </li>
              })}
            </ul>
          </div>
        </Col>
        <Col md={9}>
            {isLoading || catLoading ? (
              <Loading/>
            ) : error ? (
              <Messagebox variant={"danger"}>{error}</Messagebox>
            ): (
              <>
                <Row>
                  <Col md={6}>
                    <div>
                      {countProducts === 0 ? "No": countProducts} Results
                      {query !== 'all' && " : " + query}
                      {category !== 'all' && " : " + category}
                      {price !== 'all' && " : " + price}
                      {rating !== 'all' && " : " + rating + " & up"}
                      {(query !== 'all' || category !== 'all' || price !== 'all' || rating !== 'all') && (
                        <Button variant='light' 
                        onClick={() =>{
                          navigate(`/search?category=all&query=all&price=all&rating=all&order=newest&page=1`);
                        }}>
                          <li className='fas fa-times-circle'></li>
                        </Button>
                      )}
                    </div>
                  </Col>
                  <Col className='text-end'>
                      Order By {" "}
                      <select value={order} onChange={(e) => {
                        navigate(getFilterUrl(search, {order: e.target.value}));
                      }}>
                        <option value={'newest'}>Newest Arrivals</option>
                        <option value={'lowest'}>Price: Low to High</option>
                        <option value={'highest'}>Price: High to Low</option>
                        <option value={'toprated'}>Avg. Customer Reviews</option>
                      </select>
                  </Col>
                </Row>
                {products.length === 0 && (
                  <Messagebox>No Products Found</Messagebox>
                )}
                <Row>
                  {products.map(product => (
                    <Col sm={6} lg={4} key={product._id} className='mb-3'>
                      <Product product={product}/>
                    </Col>
                  ))}
                </Row>
                <div>
                  {[...Array(pages).keys()].map(x => (
                    <LinkContainer className='mx-1' key={x + 1} 
                    to={{
                      pathname: orderFilterURI[0],
                      search: `?${orderFilterURI[1]}`
                    }}>
                      <Button variant='light' className={Number(page) === x + 1 && "highlight-current-page"}>
                        {x + 1}
                      </Button>
                    </LinkContainer>
                  ))}
                </div>
              </>
            )}
        </Col>
      </Row>
    </div>
  )
}

export default SearchPage;