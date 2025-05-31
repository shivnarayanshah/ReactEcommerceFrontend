import { Button, Card, IconButton, Typography } from "@material-tailwind/react";
import { Link } from "react-router";
import { useGetAllProductsQuery } from "../products/productsApi.js";
import DeleteProduct from "./DeleteProduct.jsx";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const table_head = ["Title", "Description", "price", "Created_At", "Actions"];

const products = [
  {
    id: 1,
    title: "samsung",
    description: "this is samsung galaxy s25 ultra ",
    price: 24445,
    createdAt: 2025,
  },
  {
    id: 2,

    title: "sony",
    description: "this is somny phone ",
    price: 25000,
    createdAt: 2026,
  },
  {
    id: 3,

    title: "iphone",
    description: "this is iphone  165 ultra ",
    price: 50000,
    createdAt: 2030,
  },
  {
    id: 4,

    title: "tablet",
    description: "this is samsung galaxy tablet pro max ",
    price: 30000,
    createdAt: 1996,
  },
  {
    id: 5,
    title: "digital camera",
    description: "this is digital camera from 1999 ",
    price: 10000,
    createdAt: 1999,
  },
];

const AdminPanel = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.userSlice);

  const { isLoading, error, data } = useGetAllProductsQuery();
  if (isLoading) return <h1 className="text-center">Loading.......</h1>;
  if (error) return <h1 className="text-center">{error} </h1>;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link to={"/admin/add-product"}>
          <Button size="sm" color="purple">
            Add Produc t
          </Button>
        </Link>
      </div>

      <div>
        <Card className="h-full w-full overflow-scroll p-5">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {table_head.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(
                ({ _id, title, description, price, createdAt }, index) => {
                  const isLast = index === products.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
                  return (
                    <tr key={_id}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {title}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal truncate w-[350px]"
                        >
                          {description.slice(0, 60)}
                          {description.length > 60 ? "…" : ""}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          Rs. {price}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {createdAt}
                        </Typography>
                      </td>
                      <td>
                        <div className="flex gap-4">
                          <IconButton
                            color="green"
                            onClick={() =>
                              navigate(`/admin/edit-product/${_id}`)
                            }
                          >
                            <i className="fa fa-edit"></i>
                          </IconButton>
                          <DeleteProduct id={_id} />
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;
