import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "./usersApi.js";
import { Formik } from "formik";
import { Button, Input } from "@material-tailwind/react";
import toast from "react-hot-toast";

const UserProfile = ({ user }) => {
  // user.token ko sath am skip:!user?.token halnu ko karan direct mainprofile page bata logout garda console ma backend bata without tyoken fetch gareko error aayo

  const { data, isLoading, error } = useGetUserProfileQuery(user.token, {
    skip: !user?.token,
  });
  const [updateUser, { isLoading: updateLoading, error: updateError }] =
    useUpdateUserProfileMutation();
  if (isLoading) return <h1>Loading .... </h1>;
  if (error) return <p>{error.data.message || error.error}</p>;

  return (
    <div className="">
      <h1 className="text-center mb-4">Update Profile</h1>
      <Formik
        initialValues={{
          username: data.username,
          email: data.email,
        }}
        onSubmit={async (val) => {
          try {
            await updateUser({
              body: val,
              token: user.token,
            }).unwrap();
            toast.success("User Profile Updated Successfully");
          } catch (error) {
            toast.error(error.data.message || error.error);
          }
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                name="username"
                value={values.username}
                onChange={handleChange}
                label="UserName"
              />
              <Input
                name="email"
                value={values.email}
                onChange={handleChange}
                label="Email"
              />
              <Button
                type="submit"
                loading={updateLoading}
                size="sm"
                color="green"
                disabled={updateLoading}
              >
                Update
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UserProfile;
