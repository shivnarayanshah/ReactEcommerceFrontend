import { Formik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";

import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../products/productsApi.js";
import { baseUrl } from "../../store/MainApi.js";

const commonSchema = {
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  brand: Yup.string().required("Brand is required"),
  category: Yup.string().required("Category is required"),
  price: Yup.number().required("Price is required"),
};

const productSchema = Yup.object().shape({
  ...commonSchema,
  image: Yup.mixed().test("fileType", "Unsupported file format", (val) => {
    if (!val) return true;
    return [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/gif",
    ].includes(val.type);
  }),
});

const UpdateProduct = () => {
  const { id } = useParams();
  const { isLoading, error, data, refetch } = useGetSingleProductQuery(id);
  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();
  const { user } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product: {error.message}</p>;
  if (!data) return <p>No product data found</p>;

  return (
    <div>
      <Formik
        initialValues={{
          title: data.title,
          description: data.description,
          price: data.price,
          category: data.category,
          brand: data.brand,
          image: "",
          imageReview: data.image,
        }}
        validationSchema={productSchema}
        onSubmit={async (val) => {
          const token = user?.token;

          const formData = new FormData();

          formData.append("title", val.title);
          formData.append("description", val.description);
          formData.append("category", val.category);
          formData.append("brand", val.brand);

          formData.append("price", Number(val.price));

          try {
            if (val.image) formData.append("image", val.image);
            await updateProduct({
              id: id,
              body: formData,
              token: token,
            }).unwrap();

            await refetch();
            toast.success("Product Updated successfully.");
            navigate(-1);

            // for (const [key, value] of formData.entries()) {
            //   console.log(`${key}:`, value);
            // }
          } catch (error) {
            toast.error(error.data.message || error.error);
          }
        }}
      >
        {({
          handleChange,
          handleSubmit,
          errors,
          values,
          touched,
          setFieldValue,
        }) => (
          <div className="w-[450px] mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  label="Title"
                  onChange={handleChange}
                  value={values.title}
                  name="title"
                  error={errors.title && touched.title}
                />
                {errors.title && touched.title && (
                  <p className="text-red-600">{errors.title}</p>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  label="Price"
                  onChange={handleChange}
                  value={values.price}
                  name="price"
                  error={errors.price && touched.price}
                />
                {errors.price && touched.price && (
                  <p className="text-red-600">{errors.price}</p>
                )}
              </div>
              <div>
                <Select
                  name="category"
                  label="Select Category"
                  value={values.category}
                  onChange={(e) => setFieldValue("category", e)}
                >
                  <Option value="clothing">Clothing</Option>
                  <Option value="beauty">Beauty</Option>
                  <Option value="tech">Tech</Option>
                  <Option value="household">HouseHold</Option>
                </Select>
                {errors.category && touched.category && (
                  <p className="text-red-600">{errors.category}</p>
                )}
              </div>
              <div>
                <Select
                  name="brand"
                  label="Select Brand"
                  value={values.brand}
                  onChange={(e) => setFieldValue("brand", e)}
                >
                  <Option value="levis">Levis</Option>
                  <Option value="puma">Puma</Option>
                  <Option value="addidas">Addidas</Option>
                  <Option value="lakme">Lakme</Option>
                  <Option value="pantaloons">Pantaloons</Option>
                  <Option value="myntra">Myntra</Option>
                </Select>
                {errors.brand && touched.brand && (
                  <p className="text-red-600">{errors.brand}</p>
                )}
              </div>

              <div>
                <Textarea
                  name="description"
                  value={values.description}
                  label="Description"
                  error={errors.description && touched.description}
                  onChange={handleChange}
                ></Textarea>
                {errors.description && touched.description && (
                  <p className="text-red-600">{errors.description}</p>
                )}
              </div>
              <div>
                <Input
                  type="file"
                  name="image"
                  label="Select Image"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFieldValue("imageReview", URL.createObjectURL(file));
                    setFieldValue("image", file);
                  }}
                />
                {errors.image && touched.image && (
                  <p className="text-red-600">{errors.image}</p>
                )}
              </div>
              <div>
                {!errors.image && values.imageReview && (
                  <img
                    src={`${
                      values.image ? values.imageReview : baseUrl + data.image
                    }`}
                    className="h-[200px] w-[200px] object-cover mt-4"
                    alt=""
                  />
                )}
              </div>
              <Button color="purple" type="submit">
                Update
              </Button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default UpdateProduct;
