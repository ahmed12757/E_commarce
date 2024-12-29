import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const [accountExisstError, setaccountExisstError] = useState(null);
  const emailRiges =
    /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const phoneRegex = /^(02)?01[0125][0-9]{8}$/;

  function validate(values) {
    const errors = {};
    if (values.name === "") {
      errors.name = "name is required";
    } else if (values.name.length < 3) {
      errors.name = " Name must be at least 3 characters ";
    } else if (values.name.length > 20) {
      errors.name = "Name can be not more than 20 characters";
    }

    if (values.email === "") {
      errors.email = "email is required";
    } else if (!emailRiges.test(values.email)) {
      errors.email = "email is not valid";
    }

    if (values.password === "") {
      errors.password = " password is required";
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        "password | Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character";
    }

    if (values.rePassword === "") {
      errors.rePassword = " confirm password is required";
    } else if (values.password !== values.rePassword) {
      errors.rePassword = " password & confirm rePassword should be the same ";
    }

    if (values.phone === "") {
      errors.phone = " phone is required";
    } else if (!phoneRegex.test(values.phone)) {
      errors.phone = "sory , we accept egyption phone number only";
    }

    return errors;
  }
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: function (values) {
      senddata(values);
    },

    validate,
  });
  async function senddata(values) {
    const lodingToastId = toast.loading("waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.message === "success") {
        toast.success("user created Successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setaccountExisstError(error.response.data.message);
    } finally {
      toast.dismiss(lodingToastId);
    }
  }
  return (
    <div className=" space-y-3">
      <Helmet>
        <title> SignUp </title>
      </Helmet>
      <div className=" space-y-3 py-8 md:px-20 px-4">
        <h1 className="text-blue-950 text-3xl font-semibold text-center">
          Register{" "}
          <span className="">
            <i class="fa-regular fa-circle-user text-primary-400"></i>
          </span>
        </h1>
        <form action="" className=" space-y-3" onSubmit={formik.handleSubmit}>
          <div className="username ">
            <input
              type="text"
              placeholder="Enter your name"
              className="form-control"
              name="name"
              onBlur={formik.handleBlur}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-600 font-semibold">
                *{formik.errors.name}
              </p>
            )}
          </div>
          <div className="email ">
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control"
              name="email"
              onBlur={formik.handleBlur}
              value={formik.values.email}
              onChange={formik.handleChange}
            />

            {formik.errors.email && formik.touched.email && (
              <p className="text-red-600 font-semibold">
                *{formik.errors.email}
              </p>
            )}
            {accountExisstError && (
              <p className="text-red-600 font-semibold">
                *{accountExisstError}
              </p>
            )}
          </div>
          <div className="password relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="form-control"
              name="password"
              onBlur={formik.handleBlur}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <i
              onClick={togglePasswordVisibility}
              className={
                showPassword
                  ? `fa-solid fa-eye absolute  top-[50%]  right-[10px] -translate-y-[50%] cursor-pointer`
                  : `fa-solid fa-eye-slash absolute  top-[50%]  right-[10px] -translate-y-[50%] cursor-pointer `
              }
            ></i>
          </div>
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-600 font-semibold">
              *{formik.errors.password}
            </p>
          )}
          <div className="repassword relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="confarm password"
              className="form-control"
              name="rePassword"
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
              onChange={formik.handleChange}
            />
            <i
              onClick={togglePasswordVisibility}
              className={
                showPassword
                  ? `fa-solid fa-eye absolute  top-[50%]  right-[10px] -translate-y-[50%] cursor-pointer`
                  : `fa-solid fa-eye-slash absolute  top-[50%]  right-[10px] -translate-y-[50%] cursor-pointer `
              }
            ></i>
          </div>
          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="text-red-600 font-semibold">
              *{formik.errors.rePassword}
            </p>
          )}
          <div className="phone">
            <input
              type="tel"
              placeholder="enter phone number"
              className="form-control"
              name="phone"
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik.errors.phone && formik.touched.phone && (
              <p className="text-red-600 font-semibold">
                *{formik.errors.phone}
              </p>
            )}
          </div>
          <button
            type=" submit "
            className="btn bg-primary-500 w-full hover:bg-primary-700"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
