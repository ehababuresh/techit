import React, { FunctionComponent } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../services/feedbackservice";
import { addProduct } from "../services/productsService";
import Navbar from "./Navbar";

interface AddProductProps {}

const AddProduct: FunctionComponent<AddProductProps> = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            price: 0,
            category: "",
            description: "",
            image: ""
        },

        validationSchema: yup.object({
            name: yup.string().required().min(2),
            price: yup.number().required().min(2),
            category: yup.string().required().min(2),
            description: yup.string().required().min(2),
            image: yup.string().required().min(2)
        }),

        onSubmit: (values) => {
            addProduct(values)
                .then(result => {
                    console.log(result.data);
                    successMsg("Product was added successfully");
                    navigate("/products");
                })
                .catch(error => {
                    console.log(error);
                    errorMsg("Oops...something went wrong.");
                });
        }
    });

    return (
    <>
    <Navbar />

        
        <div className="container mt-4">
            <h1 className="display-4">Add Product</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3 d-flex justify-content-center">
                    <div className="form-input-container">
                        <label htmlFor="name" className="form-label">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={`form-control custom-input${formik.touched.name && formik.errors.name ? ' is-invalid' : ''}`}
                            style={{ width: "300px" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="invalid-feedback">{formik.errors.name}</div>
                        ) : null}
                    </div>
                </div>

                <div className="mb-3 d-flex justify-content-center">
                    <div className="form-input-container">
                        <label htmlFor="price" className="form-label">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className={`form-control custom-input${formik.touched.price && formik.errors.price ? ' is-invalid' : ''}`}
                            style={{ width: "300px" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.price}
                        />
                        {formik.touched.price && formik.errors.price ? (
                            <div className="invalid-feedback">{formik.errors.price}</div>
                        ) : null}
                    </div>
                </div>

                <div className="mb-3 d-flex justify-content-center">
                    <div className="form-input-container">
                        <label htmlFor="category" className="form-label">
                            Category
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            className={`form-control custom-input${formik.touched.category && formik.errors.category ? ' is-invalid' : ''}`}
                            style={{ width: "300px" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.category}
                        />
                        {formik.touched.category && formik.errors.category ? (
                            <div className="invalid-feedback">{formik.errors.category}</div>
                        ) : null}
                    </div>
                </div>

                <div className="mb-3 d-flex justify-content-center">
                    <div className="form-input-container">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            className={`form-control custom-input${formik.touched.description && formik.errors.description ? ' is-invalid' : ''}`}
                            style={{ width: "500px" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                        />
                        {formik.touched.description && formik.errors.description ? (
                            <div className="invalid-feedback">{formik.errors.description}</div>
                        ) : null}
                    </div>
                </div>

                <div className="mb-3 d-flex justify-content-center">
                    <div className="form-input-container">
                        <label htmlFor="image" className="form-label">
                            Image URL
                        </label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            className={`form-control custom-input${formik.touched.image && formik.errors.image ? ' is-invalid' : ''}`}
                            style={{ width: "300px" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.image}
                        />
                        {formik.touched.image && formik.errors.image ? (
                            <div className="invalid-feedback">{formik.errors.image}</div>
                        ) : null}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">
                    Add Product
                </button>
            </form>
        </div>
        </>
    );
    
};

export default AddProduct;
