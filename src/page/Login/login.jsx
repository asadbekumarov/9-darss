// import React from "react";
// import Logo from "../../assets/img/logo.png";
// import { NavLink, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import './style.css';

// const validationSchema = Yup.object({
//   username: Yup.string()
//     .min(5, "Kamida 5 ta harf")
//     .max(10, "10 tadan ko'p bo'lmasligi kerak")
//     .required("Nomni to'ldirish shart!"),
//   password: Yup.string()
//     .min(5, "Kamida 5 ta belgi")
//     .required("Parolni to'ldirish shart!"),
// });

// function Login() {
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       password: "",
//     },
//     validationSchema,
//     onSubmit: async (values, { setSubmitting }) => {
//       try {
//         const res = await axios.post(
//           "https://nt-shopping-list.onrender.com/api/auth",
//           values
//         );

//         if (res.status === 200) {
//           alert("Login successful!");
//           localStorage.setItem("token", res.data.token);
//           navigate("/AsideCom");
//         } else {
//           alert("Invalid credentials");
//         }
//         navigate("/main/groups/your-group-id");
//       } catch (error) {
//         // console.log(error);
//         alert(error.response?.data?.message || "Noma'lum xato yuz berdi!");
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   return (
//     <div className="section">
//       <div className="section2">
//         <div className="Left-section">
//           <img className="logo" src={Logo} alt="Logo" />
//           <p className="wel">Welcome back to</p>
//           <h1 className="shop">Shopping List</h1>
//         </div>

//         <div className="Right-section">
//           <h1 className="sign">
//             Sign In
//           </h1>
//           <form
//             onSubmit={formik.handleSubmit}
//             className="form"
//           >
//             <input
//               name="username"
//               className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${
//                 formik.touched.username && formik.errors.username
//                   ? "border-red-500"
//                   : ""
//               }`}
//               type="text"
//               placeholder="Username"
//               value={formik.values.username}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.touched.username && formik.errors.username && (
//               <div className="text-red-500 text-sm">
//                 {formik.errors.username}
//               </div>
//             )}

//             <input
//               name="password"
//               className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${
//                 formik.touched.password && formik.errors.password
//                   ? "border-red-500"
//                   : ""
//               }`}
//               type="password"
//               placeholder="Password"
//               value={formik.values.password}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.touched.password && formik.errors.password && (
//               <div className="text-red-500 text-sm">
//                 {formik.errors.password}
//               </div>
//             )}

//             <button
//               type="submit"
//               className="btnl"
//             >
//               Sign In
//             </button>
//           </form>
//           <div className="mt-4 text-start">
//             <p className="no">
//               No account yet?{" "}
//               <NavLink to="/register" className="one">
//                 Create One
//               </NavLink>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
import React from "react";
import Logo from "../../assets/img/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

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
        alert(error.response?.data?.message || "Noma'lum xato yuz berdi!");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-gray-600 h-screen flex justify-center items-center">
      <div className="bg-white rounded-xl flex items-center shadow-lg">
        <div className="bg-gray-900 px-48 py-12 rounded-l-xl flex flex-col justify-center items-center">
          <img className="w-32 h-32" src={Logo} alt="Logo" />
          <p className="text-white text-base font-normal mt-4">
            Welcome back to
          </p>
          <h1 className="text-white text-6xl font-light mt-2">Shopping List</h1>
        </div>

        <div className="w-[900px] px-16">
          <h1 className="text-blue-600 text-3xl font-medium mb-6 text-center">
            Sign In
          </h1>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <input
              name="username"
              className={`w-full px-4 py-2 border rounded-md outline-none${
                formik.touched.username && formik.errors.username
                  ? "border-red-500"
                  : "border-gray-300"
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
              className={`w-full px-4 py-2 border rounded-md outline-none${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
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
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Sign In
            </button>
          </form>
          <div className="mt-4 text-start">
            <p className="text-black text-base font-normal">
              No account yet?{" "}
              <NavLink to="/register" className="text-blue-600 hover:underline">
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
