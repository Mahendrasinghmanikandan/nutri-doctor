import React, { useState } from "react";
import {
  Avatar,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/system";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const initialValue = {
    gmail: "",
    password: "",
    status: "",
    height: "",
    weight: "",
    age: "",
    gender: "",
    foodType: "",
    contact: "",
    specialization: "",
    experience: "",
    name: "",
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialValue);
  const [extra, setExtra] = useState(false);
  const [isCustomer, setIsCustomer] = useState(null);

  const handleChange = (e, name) => {
    if (name === "status") {
      setExtra(true);
      setIsCustomer(e.target.value);
    }
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(formData);
    try {
      createUserWithEmailAndPassword(auth, formData.gmail, formData.password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          console.log(user.uid);
          try {
            await setDoc(doc(db, "users", user.uid), formData);
            setFormData(initialValue);
            toast.success("Account created successfully");
            navigate("/login");
          } catch (error) {
            toast.error("something went wrong");
          }
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          if (
            errorMessage ===
            "Firebase: Password should be at least 6 characters (auth/weak-password)."
          ) {
            toast.error("Password should be at least 6 characters ");
          }
          if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
            toast.error("This gmail already used by another user");
          }
        });
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Paper elevation={24} className="register">
      <form autoComplete="off">
        <Stack direction="column" spacing={4} className="form">
          <Typography
            variant="body1"
            sx={{ textAlign: "end", cursor: "pointer" }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Already have account
          </Typography>
          <TextField
            label="Gmail"
            variant="outlined"
            name="gmail"
            value={formData.gmail}
            onChange={(e) => handleChange(e, "gmail")}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => handleChange(e, "password")}
          />

          <FormControl fullWidth name="gender">
            <InputLabel id="demo-simple-select-label">gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.gender}
              label="gender"
              onChange={(e) => handleChange(e, "gender")}
            >
              <MenuItem value="male">male</MenuItem>
              <MenuItem value="female">female</MenuItem>
              <MenuItem value="others">others</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="contact"
            variant="outlined"
            name="contact"
            type="number"
            value={formData.contact}
            onChange={(e) => handleChange(e, "contact")}
          />
          <FormControl fullWidth name="status">
            <InputLabel id="demo-simple-select-label">who you are</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.status}
              label="who you are"
              onChange={(e) => handleChange(e, "status")}
            >
              <MenuItem value="customer">customer</MenuItem>
              <MenuItem value="doctor">doctor</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange(e, "name")}
          />
          {extra ? (
            isCustomer === "customer" ? (
              <>
                <TextField
                  label="height"
                  variant="outlined"
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={(e) => handleChange(e, "height")}
                />
                <TextField
                  label="weight"
                  variant="outlined"
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={(e) => handleChange(e, "weight")}
                />
                <TextField
                  label="age"
                  variant="outlined"
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={(e) => handleChange(e, "age")}
                />
                <FormControl fullWidth name="foodType">
                  <InputLabel id="demo-simple-select-label">
                    foodType
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData.foodType}
                    label="foodType"
                    onChange={(e) => handleChange(e, "foodType")}
                  >
                    <MenuItem value="veg">veg</MenuItem>
                    <MenuItem value="non-veg">non-veg</MenuItem>
                  </Select>
                </FormControl>
              </>
            ) : (
              <>
                <TextField
                  label="specialization"
                  variant="outlined"
                  name="age"
                  value={formData.specialization}
                  onChange={(e) => handleChange(e, "specialization")}
                />
                <FormControl fullWidth name="experience">
                  <InputLabel id="demo-simple-select-label">
                    experience
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData.experience}
                    label="foodType"
                    onChange={(e) => handleChange(e, "experience")}
                  >
                    <MenuItem value="yes">yes</MenuItem>
                    <MenuItem value="no">no</MenuItem>
                  </Select>
                </FormControl>
              </>
            )
          ) : (
            ""
          )}
          <Button
            block
            className="buttons"
            variant="contained"
            size="large"
            onClick={handleSubmit}
          >
            create new account
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default Register;
