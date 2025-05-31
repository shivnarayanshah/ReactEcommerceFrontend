import React from "react";
import { useGetAllProductsQuery } from "./productsApi.js";
import { baseUrl } from "../../store/MainApi.js";
import { useNavigate } from "react-router";
import { Rating } from "@material-tailwind/react";

const ProductList = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const navigate = useNavigate();

  if (isLoading) return <p className="text-center">loading....</p>;
  if (error) return <h1 className="text-center text-red-400">{error}</h1>;
  //   if (!data) return <p>No data to show </p>;

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-5 gap-4 px-4 ">
      {data &&
        data.map(({ _id, title, price, image, rating }) => {
          return (
            <div
              key={_id}
              className="shadow-2xl cursor-pointer rounded-2xl"
              onClick={() => navigate(`/product/${_id}`)}
            >
              <div>
                <img
                  className="h-[250px] w-[full] object-cover rounded-t-2xl"
                  src={`${baseUrl}${image}`}
                />
              </div>
              <div className="py-2 space-y-1 px-4">
                <h2 className="font-medium">{title}</h2>
                <p className="text-red-400">Rs.{price}</p>
                <Rating readonly value={rating} />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProductList;
