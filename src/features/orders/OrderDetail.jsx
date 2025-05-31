import { useParams } from "react-router";
import { useGetOrderDetailQuery } from "./orderApi.js";
import { useSelector } from "react-redux";
import { Avatar, Card, Typography } from "@material-tailwind/react";
import { baseUrl } from "../../store/MainApi.js";

const OrderDetail = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.userSlice);

  const { data, isLoading, error } = useGetOrderDetailQuery({
    id: id,
    token: user.token,
  });

  if (isLoading) return <h1 className="text-center">Loading....</h1>;
  return (
    <div>
      OrderDetail
      <hr />
      <Card className="p-5 gap-4">
        {data.orderItems.map((item) => (
          <div key={item._id} className="flex gap-4">
            <div>
              <Avatar src={`${baseUrl}${item.image}`} />
            </div>
            <div>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="small">
                {item.quantity} X Rs.{item.price}
              </Typography>
            </div>
          </div>
        ))}

        <div className="">
          <Typography>Total Amount : Rs. {data.totalAmount}</Typography>
        </div>
      </Card>
    </div>
  );
};

export default OrderDetail;
