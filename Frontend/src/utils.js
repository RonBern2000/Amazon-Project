import axios from "axios";
import { toast } from "react-toastify";
import { ADD_TO_CART } from "./actions";

export const addToCartHandler = async (product, cartItems, dispatch) => {
  const existingItem = cartItems.find((x) => x._id === product._id);
  const quantity = existingItem ? existingItem.quantity + 1 : 1;

  try {
    const { data } = await axios.get(`/api/v1/products/${product._id}`);

    if (data.countInStock < quantity) {
      toast.error("Sorry, Product is out of stock");
      return;
    }

    dispatch({
      type: ADD_TO_CART,
      payload: { ...product, quantity },
    });
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
};

//2.344 => 2.34 2.345 => 2.35
export const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

export const getFilterUrl = (searchURI, filter) => {
  const searchParams = new URLSearchParams(searchURI);

  const category = searchParams.get("category") || "all";
  const query = searchParams.get("query") || "all";
  const price = searchParams.get("price") || "all";
  const rating = searchParams.get("rating") || "all";
  const order = searchParams.get("order") || "newest";
  const page = searchParams.get("page") || 1;

  const filterPage = filter.page || page;
  const filterCategory = filter.category || category;
  const filterQuery = filter.query || query;
  const filterPrice = filter.price || price;
  const filterRating = filter.rating || rating;
  const sortOrder = filter.order || order;

  const link = `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;

  return link;
};
