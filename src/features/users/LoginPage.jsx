import { Button, Input, Typography } from "@material-tailwind/react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useLoginUserMutation } from "./usersApi.js";
import toast from "react-hot-toast";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { setUser } from "./userSlice.js";

const formValidation = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(4).max(30).required(),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  return (
    <div className="w-[450px] mx-auto shadow-2xl p-4 rounded-2xl">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (val) => {
          try {
            const response = await loginUser(val).unwrap();
            dispatch(setUser(response));
            navigate("/");
            toast.success("User login successfully.");
          } catch (error) {
            toast.error(
              error?.data?.message ||
                error?.data ||
                "Login Failed Please Try Again."
            );
          }
        }}
        validationSchema={formValidation}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          setFieldValue,
          touched,
        }) => (
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <div>
              <Typography className="text-center" variant="h4">
                Login
              </Typography>
            </div>
            <div>
              <Input
                type="email"
                label="Email"
                name="email"
                onChange={handleChange}
                value={values.email}
              />
            </div>
            <div>
              <Input
                label="Password"
                name="password"
                type="password"
                onChange={handleChange}
                value={values.password}
              />
            </div>
            <div className=" flex justify-center">
              <Button loading={isLoading} type="submit" color="green">
                Login
              </Button>
            </div>
            <div className="flex gap-4 justify-center">
              <Typography>Don't have an account ? </Typography>
              <Link to={"/register"}>Register Here</Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
