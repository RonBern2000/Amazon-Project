import Products from "../components/home/Products";
import Loading from "../components/shared/Loading";
import Messagebox from "../components/shared/Messagebox";
import Title from "../components/shared/Title";
import { useRequest } from "../hooks/useRequest";

const HomePage = () => {
  const { isLoading, error, data: products } = useRequest("/api/v1/products"); //באופן דיפולטי, הבקשה היא גט

  return (
    <div>
      <Title title="HomePage" />
      <div className="backgroundHomePage">
        <img
          src="https://m.media-amazon.com/images/I/81d5OrWJAkL.SX3000.jpg"
          alt="Background Home Page"
          style={{ width: "100%" }}
        />
      </div>
      <div className="products">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Messagebox variant={"danger"}>{error}</Messagebox>
        ) : (
          <Products products={products}/>
        )}
      </div>
    </div>
  );
};

export default HomePage;
