import { useEffect, useState } from "react";
import bgiamge from "../../assets/login bg.png";
import { Checkbox, Spin } from "antd";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { useFormik } from "formik";

import Logo from "../../assets/PropertyCRM Logo 1.png";
import LoginImage from "../../assets/loginImage.png";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setToken, setUser } from "../../redux/userSlice";
import { notifyError, notifySuccess } from "../../components/toast";
import { LoginSchema } from "../../utils/constant";
import { Icon } from "@iconify/react";

const Login = () => {
  useEffect(() => {
    document.title = "Leads — Property CRM";
  }, []);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      await handleLogin(values);
    },
  });

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    // try {
    //   const response = await adminLogin(values);
    //   const data = response.data ?? response;
    //   if (!data || !data.user || !data.token) {
    //     notifyError("Invalid login response from server");
    //     return;
    //   }

    //   const role = data.user.role?.toLowerCase();
    //   if (role !== "admin") {
    //     notifyError("You are not allowed to login.");
    //     return;
    //   }

    //   dispatch(setUser({ user: data.user, token: data.token }));
    //   dispatch(setIsLoggedIn(true));
    //   dispatch(setToken(data.token));

    //   notifySuccess("Successfully Logged In");
    // } catch (error: any) {
    //   notifyError(
    //     error.response?.data?.message ||
    //       error.message ||
    //       "Something went wrong.",
    //   );
    // } finally {
    //   setLoading(false);
    // }
  };

  const antIcon = (
    <Loading3QuartersOutlined style={{ fontSize: 24, color: "white" }} spin />
  );
  return (
    <div className="w-full h-screen xl:px-23.75 px-5 py-8 gap-15 flex items-center">
      <div className="xl:w-[calc(50%-30px)] w-full">
        <div className="flex items-center justify-center gap-2">
          <img src={Logo} className="w-20 h-auto md:w-25" alt="logo" />
          <p className="md:text-4xl text-2xl font-bold text-[#0049B6]">
            Property <span className="text-[#FF7631]">CRM</span>
          </p>
        </div>
        <div className="bg-[#F7F7F7] xl:px-11.5 px-6 py-8 text-center mt-5 rounded-[1px]">
          <p className="text-heading text-[24px] font-medium">Sign In</p>
          <p className="text-[#7D7D7D] md:text-[18px] text-sm font-medium mt-5">
            Welcome Back! Please enter your details
          </p>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 mt-5"
          >
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm text-start text-[#7D7D7D] mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="w-full h-13.75 px-4 rounded-md bg-[#29AAE10F] text-heading
                  border-none outline-none focus:ring-0 focus:border-none"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="mt-1 text-sm text-red-500 text-start">
                  *{formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="relative flex flex-col">
              <label
                htmlFor="password"
                className="text-sm text-start text-[#7D7D7D] mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="w-full h-13.75 px-4 rounded-md bg-[#29AAE10F] text-heading 
                  border-none outline-none focus:ring-0 focus:border-none pr-12"
              />
              <span
                className="absolute right-4 top-10 cursor-pointer text-[#7D7D7D]"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <Icon
                    icon="solar:eye-bold"
                    className="text-xl text-primary"
                  />
                ) : (
                  <Icon
                    icon="fa-solid:eye-slash"
                    className="text-xl text-primary"
                  />
                )}
              </span>
              {formik.touched.password && formik.errors.password ? (
                <div className="mt-1 text-sm text-red-500 text-start">
                  *{formik.errors.password}
                </div>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 ">
              <div className="flex items-center gap-3">
                <Checkbox
                  className="[&_.ant-checkbox-inner]:border-primary 
                  [&_.ant-checkbox-checked_.ant-checkbox-inner]:bg-primary"
                />
                <p className="text-heading sm:text-[14px] text-xs font-medium">
                  Remember for 30 Days
                </p>
              </div>
              <p className="text-primary text-[12px] font-medium cursor-pointer">
                Forget password
              </p>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="bg-primary cursor-pointer text-white w-full h-13.75 mt-5 rounded-md text-xl font-medium flex items-center justify-center"
            >
              {loading ? <Spin indicator={antIcon} /> : "Login"}
            </button>
          </form>
        </div>
      </div>
      <div
        className="w-[calc(50%-30px)] p-9 xl:flex hidden flex-col justify-between h-full rounded-xl text-white"
        style={{
          backgroundImage: `url(${bgiamge})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <p className="font-semibold text-[48px] leading-[100%]">
          Welcome Back! Please sign in to your{" "}
          <span className="underline">Property CRM</span> account
        </p>
        <img
          src={LoginImage}
          className="w-full xl:h-76.25 2xl:h-137.5"
          alt="login"
        />
      </div>
    </div>
  );
};

export default Login;
