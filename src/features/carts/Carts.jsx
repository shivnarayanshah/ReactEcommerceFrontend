import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { clearAllCarts, removeFromCarts, setToCarts } from "./cartSlice.js";
import { baseUrl } from "../../store/MainApi.js";
import { useCreateOrderMutation } from "../orders/orderApi.js";

const TABLE_HEAD = ["Product", "Title", "Price", "Quantity", "Total", "Action"];

const Carts = () => {
  const { carts } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();
  const totalAmount = carts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const { user } = useSelector((state) => state.userSlice);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const handleOrder = async () => {
    const order = { totalAmount: totalAmount, orderItems: carts };
    try {
      await createOrder({
        body: order,
        token: user.token,
      }).unwrap();
      dispatch(clearAllCarts());
      toast.success("Order Placed Successfully");
    } catch (error) {
      toast.error(error.data.message || error.message);
    }
  };

  const handleDelete = (id) => {
    dispatch(removeFromCarts(id));
  };

  if (carts.length <= 0)
    return (
      <p className="text-center">
        No Carts Product to show , Please add Some Products
      </p>
    );

  return (
    <div>
      {carts.length > 0 && (
        <div>
          <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
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
                {carts.map(({ _id, title, price, quantity, image }, index) => {
                  const isLast = index === carts.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={_id}>
                      <td className={classes}>
                        <Avatar src={`${baseUrl}${image}`} />
                      </td>
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
                          className="font-normal"
                        >
                          Rs. {price}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <UpdateToCart
                          product={{ _id, title, price, quantity, image }}
                        />
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          Rs. {price * quantity}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Button color="pink" onClick={() => handleDelete(_id)}>
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
          <div className="mt-6 space-y-4 flex flex-col items-end">
            <h1 className="text-xl">Total Amount : Rs.{totalAmount}</h1>
            <Button color="green" loading={isLoading} onClick={handleOrder}>
              Place an Order
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carts;

function UpdateToCart({ product }) {
  const dispatch = useDispatch();

  const handleCart = (isAdd) => {
    dispatch(
      setToCarts({
        ...product,
        quantity: isAdd ? product.quantity + 1 : product.quantity - 1,
      })
    );
  };

  return (
    <div className="flex gap-4">
      <IconButton
        color="red"
        onClick={() => handleCart(false)}
        disabled={product.quantity === 1}
        size="sm"
      >
        <i className=" fas fa-minus" />
      </IconButton>
      <h1 className="flex items-center">{product.quantity}</h1>
      <IconButton color="green" size="sm" onClick={() => handleCart(true)}>
        <i className=" fas fa-plus" />
      </IconButton>
    </div>
  );
}
