import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../components/context/User.context";
import { Helmet } from "react-helmet";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  let { setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [accountExisstError, setaccountExisstError] = useState(null);
  const emailRiges =
    /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  function validate(values) {
    const errors = {};

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

    return errors;
  }
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("user created Successfully");
        setTimeout(() => {
          navigate("/");
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
    <div className=" container space-y-3 ">
      <Helmet>
        <title> Login </title>
      </Helmet>
      <div className=" space-y-3 py-8 md:px-20 px-4 ">
        <h1 className="text-blue-950 text-3xl font-semibold text-center">
          Login{" "}
          <span className="">
            <i class="fa-regular fa-circle-user text-primary-400"></i>
          </span>
        </h1>
        <form action="" className=" space-y-3" onSubmit={formik.handleSubmit}>
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
          <Link to={`/forgot`} className="my-2">
            <p className="my-2">Forgot your password?</p>
          </Link>
          <button
            type=" submit "
            className="btn !my-0 bg-primary-500 w-full hover:bg-primary-700 rounded-xl"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
