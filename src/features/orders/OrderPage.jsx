import { userApi } from "../users/usersApi.js";
import { useGetOrdersQuery } from "./orderApi.js";
import { Button, Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router";

const TABLE_HEAD = ["OrderId", "OrderDate", "TotalAmount", "OrderDetails"];

const OrderPage = ({ user }) => {
  const navigate = useNavigate();
  // user.token ko sath am skip:!user?.token halnu ko karan direct mainprofile page bata logout garda console ma backend bata without tyoken fetch gareko error aayo
  const { data, isLoading, error } = useGetOrdersQuery(user.token, {
    skip: !user?.token,
  });

  if (isLoading) return <h1>Loading ...... </h1>;
  if (error) return <p>{error.data.message || error.error}</p>;
  if (data.length <= 0) return <h1 className="text-center">No Data</h1>;

  return (
    <div className="col-span-2">
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
            {data.map(({ createdAt, totalAmount, _id }, index) => {
              const isLast = index === data.length - 1;
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
                      {_id}
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
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      Rs. {totalAmount}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Button
                      size="sm"
                      onClick={() => navigate(`/user/orders/${_id}`)}
                    >
                      Order Detail
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default OrderPage;
