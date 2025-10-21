import React, { useEffect, useState } from "react";
import axios from "axios";
import BasicTable from "../Components/Table";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

const Home = () => {
    const [userData, setUserdata] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`https://68f78e5ff7fb897c66165042.mockapi.io/users`)
            .then((res) => {
                setUserdata(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#01001a",
                padding: "35px 0",
            }}
        >
            <Box
            className="flex justify-between"
                sx={{
                    width: "90%",
                    margin: "auto",
                    marginBottom: 3,
                }}
            >
                <h1 className="text-[white] ms-13 text-3xl font-bold">User Management Crud </h1>
                <Button
                    variant="contained"
                    onClick={() => navigate("/CreateUser")}
                    sx={{
                        backgroundColor: "#007bff",
                        textTransform: "none",
                        fontWeight: "bold",
                        borderRadius: "10px",
                        // padding: "10px 20px",
                        boxShadow: "0 0 10px rgba(7, 7, 7, 0.3)",
                        "&:hover": { backgroundColor: "#0056b3" },
                        transition: "0.3s",
                    }}
                >
                    + Create User
                </Button>
            </Box>

            <BasicTable userdata={userData} />
        </div>
    );
};

export default Home;
