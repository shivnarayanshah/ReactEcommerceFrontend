import { Button, Input, Typography } from "@material-tailwind/react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router";
import * as Yup from "yup";
import { useLoginUserMutation, useRegisterUserMutation } from "./usersApi.js";
import { setUser } from "./userSlice.js";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const formValidation = Yup.object({
  username: Yup.string().min(4).max(20).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(4).max(30).required(),
});

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerUser, { isLoading: loading }] = useRegisterUserMutation();

  const [loginUser, { isLoading }] = useLoginUserMutation();
  return (
    <div className="w-[450px] mx-auto shadow-2xl p-4 rounded-2xl">
      <Formik
        initialValues={{
          email: "",
          password: "",
          username: "",
        }}
        onSubmit={async (val) => {
          try {
            await registerUser(val).unwrap();
            const response = await loginUser({
              email: val.email,
              password: val.password,
            });
            dispatch(setUser(response));
            navigate("/");
            toast.success("User Registerd Successfully.");
          } catch (error) {
            toast.error(
              error?.data?.message ||
                error?.data ||
                "Register Failed Please Try Again."
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
                Register New User
              </Typography>
            </div>
            <div>
              <Input
                type="text
              "
                label="UserName"
                onChange={handleChange}
                value={values.username}
                name="username"
              />
            </div>
            <div>
              <Input
                type="text
              "
                label="Email"
                onChange={handleChange}
                value={values.email}
                name="email"
              />
            </div>
            <div>
              <Input
                label="Password"
                onChange={handleChange}
                value={values.password}
                name="password"
                type="password"
              />
            </div>
            <div className=" flex justify-center">
              <Button type="submit" color="green">
                Register
              </Button>
            </div>
            <div className="flex gap-4 justify-center">
              <Typography>Already have an account ? </Typography>
              <Link to={"/login"}>Register Here</Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterPage;
