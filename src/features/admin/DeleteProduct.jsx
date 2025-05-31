import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { IconButton } from "@material-tailwind/react";
import { useDeleteProductMutation } from "../products/productsApi.js";

export default function DeleteProduct({ id }) {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const { user } = useSelector((state) => state.userSlice);

  const handleRemove = async () => {
    try {
      await deleteProduct({
        id,
        token: user.token,
      }).unwrap();
      toast.success("Product Removed");
    } catch (err) {
      console.log(err);
      //   toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <IconButton onClick={handleRemove} color="pink">
          <i className="fas fa-trash" />
        </IconButton>
      )}
    </>
  );
}
