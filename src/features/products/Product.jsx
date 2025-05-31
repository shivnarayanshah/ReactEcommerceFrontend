import React, { useState } from "react";
import { data, useNavigate, useParams } from "react-router";
import { useGetSingleProductQuery } from "./productsApi.js";
import { baseUrl } from "../../store/MainApi.js";
import {
  Button,
  Card,
  rating,
  Rating,
  Typography,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { setToCarts } from "../carts/cartSlice.js";

const Product = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetSingleProductQuery(id);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <h1 className="text-center">{error}/</h1>;

  return (
    <Card className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 p-4">
      <div className=" flex items-center justify-center">
        <img
          className="h-[350px] w-full object-cover rounded-xl"
          src={`${baseUrl}${data.image}`}
        />
      </div>
      <div className="space-y-3">
        <h2 className="text-xl">{data.title}</h2>
        <p className="text-sm">{data.description}</p>
        <div className="flex gap-4">
          <h1>Rating:</h1>
          <Rating />
        </div>
        <div className="flex gap-4">
          <h1>Price : </h1>
          <p className="text-red-400">Rs.{data.price}</p>
        </div>
      </div>
      <AddToCart product={data} />
    </Card>
  );
};

function AddToCart({ product }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);
  const { carts } = useSelector((state) => state.cartSlice);

  const isExist = carts?.find((cart) => cart._id === product._id);

  // console.log(isExist);
  const [count, setCount] = useState(isExist?.quantity || 1);
  // const [count, setCount] = useState(1);

  const navigate = useNavigate();

  const handleAddToCart = () => {
    const payload = {
      _id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      rating: product.rating,
      quantity: count,
    };
    dispatch(setToCarts(payload));
  };

  return (
    <div className="md:col-span-2 lg:col-span-1 space-y-4 ">
      <div>
        <h1 className="text-center">Add to Cart</h1>
      </div>
      <div className="flex justify-around">
        <Button disabled={count <= 1} onClick={() => setCount(count - 1)}>
          <i className="fas fa-minus"></i>
        </Button>
        <Typography>{count}</Typography>
        <Button onClick={() => setCount(count + 1)}>
          <i className="fas fa-plus"></i>
        </Button>
      </div>
      <div className="flex justify-center">
        <Button
          disabled={!user || user?.role === "Admin"}
          onClick={() => {
            handleAddToCart();
            navigate("/carts");
          }}
          color="green"
        >
          Add To Cart
        </Button>
      </div>
    </div>
  );
}

export default Product;
