import React from "react";
import Logo from "../../assets/img/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import './style.css';


const validationSchema = Yup.object({
  username: Yup.string()
    .min(5, "Kamida 5 ta harf")
    .max(10, "10 tadan ko'p bo'lmasligi kerak")
    .required("Nomni to'ldirish shart!"),
  password: Yup.string()
    .min(5, "Kamida 5 ta belgi")
    .required("Parolni to'ldirish shart!"),
});

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await axios.post(
          "https://nt-shopping-list.onrender.com/api/auth",
          values
        );

        if (res.status === 200) {
          alert("Login successful!");
          localStorage.setItem("token", res.data.token);
          navigate("/AsideCom");
        } else {
          alert("Invalid credentials");
        }
        navigate("/main/groups/your-group-id");
      } catch (error) {
        console.log(error);
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
          <p className="wel">Welcome back to</p>
          <h1 className="shop">Shopping List</h1>
        </div>

        <div className="Right-section">
          <h1 className="sign">
            Sign In
          </h1>
          <form
            onSubmit={formik.handleSubmit}
            className="form"
          >
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
            >
              Sign In
            </button>
          </form>
          <div className="mt-4 text-start">
            <p className="no">
              No account yet?{" "}
              <NavLink to="/register" className="one">
                Create One
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
