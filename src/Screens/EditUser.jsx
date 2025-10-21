import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditUser = () => {
  const { id } = useParams();
  const [singleUserData, setSingleUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://68f78e5ff7fb897c66165042.mockapi.io/users/${id}`)
      .then((response) => {
        setSingleUserData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const editUser = async () => {
    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(singleUserData.phone)) {
      toast.error("Phone number must be 11 digits!", {
        position: "top-center",
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    try {
      const res = await axios.get("https://68f78e5ff7fb897c66165042.mockapi.io/users");
      const userExists = res.data.some(
        (u) => u.email === singleUserData.email && u.id !== id
      );

      if (userExists) {
        toast.warn("Email already exists!", {
          position: "top-center",
          theme: "dark",
          transition: Bounce,
        });
        return;
      }

      const response = await axios.get("https://68f78e5ff7fb897c66165042.mockapi.io/users");
      const phoneExist = response.data.some(
        (u) => u.phone === singleUserData.phone && u.id !== id
      );

      if (phoneExist) {
        toast.warn("Phone number already exists!", {
          position: "top-center",
          theme: "dark",
          transition: Bounce,
        });
        return;
      }

      await axios.put(
        `https://68f78e5ff7fb897c66165042.mockapi.io/users/${id}`,
        singleUserData
      );
      toast.success("User edited successfully!", {
        position: "top-center",
        theme: "dark",
        transition: Bounce,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!", {
        position: "top-center",
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-black p-4 sm:p-6 md:p-10">
      <div className="bg-white/10 backdrop-blur-md border border-gray-600 rounded-2xl p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md md:max-w-lg shadow-2xl transform transition-all duration-300 hover:scale-[1.02]">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-white mb-6 tracking-wide animate-pulse">
          Edit User
        </h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Enter Name"
          value={singleUserData.name || ""}
          onChange={(e) =>
            setSingleUserData({ ...singleUserData, name: e.target.value })
          }
          className="w-full mb-4 p-3 rounded-lg bg-transparent border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
        />

        {/* Username */}
        <input
          type="text"
          placeholder="Enter Username"
          value={singleUserData.username || ""}
          onChange={(e) =>
            setSingleUserData({ ...singleUserData, username: e.target.value })
          }
          className="w-full mb-4 p-3 rounded-lg bg-transparent border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          value={singleUserData.email || ""}
          onChange={(e) =>
            setSingleUserData({ ...singleUserData, email: e.target.value })
          }
          className="w-full mb-4 p-3 rounded-lg bg-transparent border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
        />

        {/* Phone */}
        <input
          type="text"
          placeholder="Enter Phone (11 digits)"
          value={singleUserData.phone || ""}
          onChange={(e) =>
            setSingleUserData({ ...singleUserData, phone: e.target.value })
          }
          className="w-full mb-6 p-3 rounded-lg bg-transparent border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
        />

        {/* Button */}
        <button
          onClick={editUser}
          className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base"
        >
          Edit User 🚀
        </button>
      </div>
    </div>
  );
};

export default EditUser;
