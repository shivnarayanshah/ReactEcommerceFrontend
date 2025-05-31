import OrderPage from "../orders/OrderPage.jsx";
import UserProfile from "./UserProfile.jsx";
import { useSelector } from "react-redux";

const ProfileMainPage = () => {
  const { user } = useSelector((state) => state.userSlice);

  return (
    <div className="grid grid-cols-3 gap-4">
      <UserProfile user={user} />
      <OrderPage user={user} />
    </div>
  );
};

export default ProfileMainPage;
