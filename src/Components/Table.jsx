import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function BasicTable({ userdata }) {
  const navigate = useNavigate();

  const deleteUser = (userID) => {
    axios
      .delete(`https://68f78e5ff7fb897c66165042.mockapi.io/users/${userID}`)
      .then(() => {
        toast.success("User deleted successfully!");
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "95%",
        margin: "auto",
        marginTop: 5,
        borderRadius: 3,
        backgroundColor: "rgb(20, 25, 45)",
        boxShadow: "0px 0px 20px rgba(0,0,0,0.3)",
        overflowX: "auto", // ✅ allows horizontal scroll on small screens
      }}
    >
      <Table sx={{ minWidth: 600 }} aria-label="responsive table">
        <TableHead sx={{ backgroundColor: "rgb(37, 37,73)" }}>
          <TableRow>
            {["ID", "Name", "Username", "Email", "Phone", "Actions"].map(
              (head) => (
                <TableCell
                  key={head}
                  sx={{
                    color: "white",
                    fontSize: { xs: 12, sm: 14, md: 16 }, // ✅ responsive font
                    textAlign: head === "ID" || head === "Name" ? "left" : "right",
                  }}
                >
                  {head}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {userdata &&
            userdata.map((e, i) => (
              <TableRow
                key={e.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "rgb(30, 40, 70)" },
                  transition: "0.3s",
                }}
              >
                <TableCell sx={{ fontSize: { xs: 12, sm: 14, md: 15 }, color: "white" }}>
                  {i + 1}
                </TableCell>
                <TableCell sx={{ fontSize: { xs: 12, sm: 14, md: 15 }, color: "white" }}>
                  {e.name}
                </TableCell>
                <TableCell
                  sx={{ fontSize: { xs: 12, sm: 14, md: 15 }, color: "white" }}
                  align="right"
                >
                  {e.username}
                </TableCell>
                <TableCell
                  sx={{ fontSize: { xs: 12, sm: 14, md: 15 }, color: "white" }}
                  align="right"
                >
                  {e.email}
                </TableCell>
                <TableCell
                  sx={{ fontSize: { xs: 12, sm: 14, md: 15 }, color: "white" }}
                  align="right"
                >
                  {e.phone}
                </TableCell>
                <TableCell sx={{ fontSize: 15 }} align="right">
                  <EditIcon
                    onClick={() => navigate(`/editUser/${e.id}`)}
                    sx={{
                      color: "lightgreen",
                      cursor: "pointer",
                      marginRight: 2,
                      fontSize: { xs: 18, sm: 20, md: 22 },
                    }}
                  />
                  <DeleteIcon
                    onClick={() => deleteUser(e.id)}
                    sx={{
                      color: "tomato",
                      cursor: "pointer",
                      fontSize: { xs: 18, sm: 20, md: 22 },
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
