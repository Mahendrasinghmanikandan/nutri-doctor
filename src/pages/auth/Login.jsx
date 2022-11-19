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
import { Animated } from "react-animated-css";

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
      navigation("/dashboard");
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
    <Paper elevation={24} className="login">
      <form autoComplete="off" className="login-form">
        <Animated
          animationIn="bounceInLeft"
          animationOut="fadeOut"
          isVisible={true}
        >
          <Stack direction="column" spacing={4} className="form">
            <Typography
              variant="body1"
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              login here
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
            <Typography
              variant="body1"
              sx={{ textAlign: "end", cursor: "pointer", fontWeight: "bold" }}
              onClick={() => {
                navigate("/");
              }}
            >
              create new account
            </Typography>
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
        </Animated>
      </form>
    </Paper>
  );
};

export default Login;
