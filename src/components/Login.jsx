import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { LuCircleUserRound } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";

import { backendUrl } from "../App";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin1234");
  const [visible, setVisible] = useState(false);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const changeVisibilityHandler = () => {
    setVisible((visibility) => !visibility);
  };

  const icon = visible ? (
    <FaEyeSlash
      onClick={changeVisibilityHandler}
      className="text-gray-500 cursor-pointer"
    />
  ) : (
    <FaEye
      onClick={changeVisibilityHandler}
      className="text-gray-500 cursor-pointer"
    />
  );
  const inputType = visible ? "text" : "password";

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md ">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <div className="flex items-center">
              <div className="bg-[#dee2e6] py-[11px] px-2 border border-gray-300 border-r-0 text-lg">
                <LuCircleUserRound />
              </div>

              <input
                value={email}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 outline-none"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <div className="flex items-center">
              <div className="bg-[#dee2e6] py-[11px] px-2 border border-gray-300 border-r-0 text-lg">
                <RiLockPasswordLine />
              </div>

              <div className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 outline-none">
                <input
                  className="border-none outline-none"
                  value={password}
                  type={inputType}
                  placeholder="Enter password"
                  required
                />
                <span>{icon}</span>
              </div>
            </div>
          </div>
          <button
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-[#7b2cbf] hover:bg-[#923cdd]"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
