import React from 'react'
import Title from '../components/shared/Title'
import useRequest from '../hooks/useRequest'
import Loading from '../components/shared/Loading';
import Messagebox from '../components/shared/Messagebox';
import Products
 from '../components/home/Products';

const HomePage = () => {

  const {isLoading, error, data: products} = useRequest('/api/v1/products'); // default is GET

  return (
    <div>
        <Title title='HomePage'></Title>
        <div className="backgroundHomePage">
          <img src="https://m.media-amazon.com/images/I/81d5OrWJAkL.SX3000.jpg" alt="background Home Page" style={{width: "100%"}}/>
        </div>
        <div className='products'>
          {isLoading ? (
            <Loading/>
          ) : error ? (
          <Messagebox variant={"danger"}>{error}</Messagebox>
          ) : (
            <Products products={products}/>
          )}
        </div>
    </div>
  )
}

export default HomePage;