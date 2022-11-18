import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const Profile = ({ fullData }) => {
  console.log(fullData);
  return (
    <Stack
      spacing={4}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "40px",
      }}
    >
      <table>
        <tr>
          <th>Name</th>
          <td>{fullData.name}</td>
        </tr>
        <tr>
          <th>Contact</th>
          <td>{fullData.contact}</td>
        </tr>
        <tr>
          <th>Gmail</th>
          <td>{fullData.gmail}</td>
        </tr>
        <tr>
          <th>Gender</th>
          <td>{fullData.gender}</td>
        </tr>
        {fullData.status === "customer" ? (
          <>
            <tr>
              <th>Height</th>
              <td>{fullData.height}</td>
            </tr>
            <tr>
              <th>Weight</th>
              <td>{fullData.weight}</td>
            </tr>
            <tr>
              <th>Age</th>
              <td>{fullData.age}</td>
            </tr>
            <tr>
              <th>FoodType</th>
              <td>{fullData.foodType}</td>
            </tr>
          </>
        ) : (
          <>
            <tr>
              <th>Specialization</th>
              <td>{fullData.specialization}</td>
            </tr>
            <tr>
              <th>Experience</th>
              <td>
                {fullData.experience === "yes" ? "I have" : "I don't have'"}
              </td>
            </tr>
          </>
        )}
      </table>
    </Stack>
  );
};

export default Profile;
