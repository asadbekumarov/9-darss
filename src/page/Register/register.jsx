import React from "react";
import Logo from "../../assets/img/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./style.css";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Kamida 3 ta harf")
    .max(15, "15 tadan ko'p bo'lmasligi kerak")
    .required("Ismni to'ldirish shart!"),
  username: Yup.string()
    .min(5, "Kamida 5 ta harf")
    .max(10, "10 tadan ko'p bo'lmasligi kerak")
    .required("Nomni to'ldirish shart!"),
  password: Yup.string()
    .min(6, "Kamida 6 ta belgi")
    .required("Parolni to'ldirish shart!"),
});

function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await axios.post(
          "https://nt-shopping-list.onrender.com/api/users",
          values
        );

        if (res.status === 201) {
          alert("Account successfully created!");
          localStorage.setItem("token", res.data.token);
          navigate("/main");
        } else {
          alert("Error while creating account!");
        }
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || "Noma'lum xato yuz berdi!");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="section">
      <div className="section2">
        <div className="Left-section">
          <img className="logo" src={Logo} alt="Logo" />
          <p className="wel">Welcome to</p>
          <h1 className="shop">Shopping List</h1>
        </div>

        <div className="Right-section">
          <h1 className="sign">Create an Account</h1>
          <form onSubmit={formik.handleSubmit} className="form">
            <input
              name="name"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : ""
              }`}
              type="text"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}

            <input
              name="username"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${
                formik.touched.username && formik.errors.username
                  ? "border-red-500"
                  : ""
              }`}
              type="text"
              placeholder="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-500 text-sm">
                {formik.errors.username}
              </div>
            )}

            <input
              name="password"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : ""
              }`}
              type="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            )}

            <button
              type="submit"
              className="btnl"
              disabled={formik.isSubmitting}
            >
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-start">
            <p className="no">
              Already have an account?{" "}
              <NavLink to="/login" className="one">
                Log In
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
