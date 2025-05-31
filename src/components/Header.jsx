import { Button, Navbar, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import ProfileMenu from "./ProfileMenu.jsx";
const Header = () => {
  const { user } = useSelector((state) => state.userSlice);
  return (
    <div>
      <Navbar className="min-w-full py-1.5 rounded-none">
        <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
          <Link to={"/"}>
            <Typography className="mr-4 ml-2 cursor-pointer py-0 font-medium">
              Home
            </Typography>
          </Link>
          {!user ? (
            <div className="px-2">
              <Link to={"/register"}>
                <Button size="sm" variant="text">
                  Register
                </Button>
              </Link>
              <Link to={"/login"}>
                <Button size="sm" variant="text">
                  Login
                </Button>
              </Link>
            </div>
          ) : (
            <ProfileMenu user={user} />
          )}
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
