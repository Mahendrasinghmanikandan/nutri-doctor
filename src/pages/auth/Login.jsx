import React, { useState } from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth, db } from "../../firebase/firebase";
import { change } from "../../Features/authSlice";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const Login = () => {
  const initialValue = { gmail: "", password: "" };
  const [formData, setFormData] = useState(initialValue);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const users = await signInWithEmailAndPassword(
        auth,
        formData.gmail,
        formData.password
      );
      const docRef = doc(db, "users", users.user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        dispatch(change({ user: docSnap.data() }));
      } else {
        console.log("No such document!");
      }
      toast.success("Start your journey");
      navigation("/home");
    } catch (error) {
      console.log(error.message);
      if (error.message === "Firebase: Error (auth/user-not-found).") {
        toast.error("Invalid account details");
      }
      if (error.message === "Firebase: Error (auth/wrong-password).") {
        toast.error("Invalid user password");
      }
      toast.error("Something went wrong");
    }
  };
  return (
    <Paper elevation={24} className="register">
      <form autoComplete="off">
        <Stack direction="column" spacing={6} className="form">
          <Typography
            variant="body1"
            sx={{ textAlign: "end", cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
          >
            create new account
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
            name="password"
            value={formData.password}
            onChange={(e) => handleChange(e, "password")}
          />
          <Button
            block
            variant="contained"
            size="large"
            className="buttons"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default Login;
