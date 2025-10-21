import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateUser = () => {
  const navigate = useNavigate();
  const [createUserData, setCreateUserData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  const createUser = async () => {
    const { name, username, email, phone } = createUserData;

    // field check
    if (!name || !username || !email || !phone) {
      toast.warn("Please fill all fields!", { position: "top-center", theme: "dark", transition: Bounce });
      return;
    }

    // email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format!", { position: "top-center", theme: "dark", transition: Bounce });
      return;
    }

    // phone check (exactly 11 digits)
    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Phone number must be 11 digits!", { position: "top-center", theme: "dark", transition: Bounce });
      return;
    }

    try {
      const res = await axios.get("https://68f78e5ff7fb897c66165042.mockapi.io/users");
      const userExists = res.data.some((u) => u.email === email);

      if (userExists) {
        toast.warn("Email already exists!", { position: "top-center", theme: "dark", transition: Bounce });
        return;
      }

      const responce = await axios.get("https://68f78e5ff7fb897c66165042.mockapi.io/users");
      const phoneExist = responce.data.some((u) => u.phone === phone);

      if (phoneExist) {
        toast.warn("phone number already exists!", { position: "top-center", theme: "dark", transition: Bounce });
        return;
      }

      await axios.post("https://68f78e5ff7fb897c66165042.mockapi.io/users", createUserData);
      toast.success("User created successfully!", { position: "top-center", theme: "dark", transition: Bounce });
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!", { position: "top-center", theme: "dark", transition: Bounce });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-black p-4">
      <div className="bg-white/10 backdrop-blur-md border border-gray-600 rounded-2xl p-8 w-full max-w-lg shadow-2xl transform transition-all duration-300 hover:scale-[1.02]">
        <h2 className="text-3xl font-semibold text-center text-white mb-6 tracking-wide animate-pulse">
          Create New User
        </h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Enter Name"
          onChange={(e) => setCreateUserData({ ...createUserData, name: e.target.value })}
          className="w-full mb-4 p-3 rounded-lg bg-transparent border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        />

        {/* Username */}
        <input
          type="text"
          placeholder="Enter Username"
          onChange={(e) => setCreateUserData({ ...createUserData, username: e.target.value })}
          className="w-full mb-4 p-3 rounded-lg bg-transparent border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setCreateUserData({ ...createUserData, email: e.target.value })}
          className="w-full mb-4 p-3 rounded-lg bg-transparent border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        />

        {/* Phone */}
        <input
          type="text"
          placeholder="Enter Phone (11 digits)"
          onChange={(e) => setCreateUserData({ ...createUserData, phone: e.target.value })}
          className="w-full mb-6 p-3 rounded-lg bg-transparent border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        />

        {/* Button */}
        <button
          onClick={createUser}
          className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Create User 🚀
        </button>
      </div>
    </div>
  );
};

export default CreateUser;
