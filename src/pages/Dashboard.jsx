/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "../Styles/dashboard.scss";
import { useSelector } from "react-redux";
import { Animated } from "react-animated-css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { toast } from "react-toastify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { uid } from "uid";
const Dashboard = () => {
  const currentUser = useSelector((data) => data.auth.values.user);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const condition =
      currentUser.status === "customer"
        ? query(collection(db, "products"))
        : query(
            collection(db, "products"),
            where("uid", "==", currentUser.gmail)
          );
    try {
      const q = condition;
      onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          console.log(doc);
          data.push(doc);
        });

        setData(data);
      });
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productName = e.target[0].value;
    const productQuantity = e.target[2].value;
    const productCalories = e.target[4].value;
    const productImage = e.target[6].files[0];
    const date = new Date().getTime();
    const storageRef = ref(storage, `${uid() + date}`);
    try {
      await uploadBytesResumable(storageRef, productImage).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await setDoc(doc(db, "products", uid()), {
              uid: currentUser.gmail,
              delete_id: uid(),
              productName: productName,
              productQuantity: productQuantity,
              productCalories: productCalories,
              photoURL: downloadURL,
            });
            setOpen(!open);
            toast.success("SuccessFully Uploaded");
          } catch (err) {
            toast.error("Something Went Wrong");
          }
        });
      });
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-others ">
        <Stack alignItems="center">
          <Typography
            sx={{ textAlign: "left", padding: "20px" }}
            className="display-products"
            variant="h4"
          >
            Nutrition Product Details
          </Typography>
          <Typography sx={{ textAlign: "end" }}>
            {currentUser.status === "doctor" ? (
              <AddAPhotoOutlinedIcon
                onClick={() => {
                  setOpen(!open);
                }}
              />
            ) : (
              ""
            )}
          </Typography>
        </Stack>
      </div>
      <div className="products">
        {console.log(data)}
        {data?.map((res) => {
          return (
            <>
              {" "}
              <Animated
                animationIn="zoomIn"
                animationOut="fadeOut"
                isVisible={true}
              >
                <Card className="cards">
                  <CardMedia
                    component="img"
                    height="240"
                    sx={{ borderRadius: "10px" }}
                    image={res.data().photoURL}
                    alt="green iguana"
                  />
                  <CardContent>
                    <table style={{ border: "none", padding: "1px" }}>
                      <tr>
                        <th className="customize-table">
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            className="display-products"
                          >
                            Product Name
                          </Typography>
                        </th>
                        <td className="customize-table">
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            className="display-products"
                          >
                            {res.data().productName}
                          </Typography>
                        </td>
                      </tr>
                      <tr>
                        <th className="customize-table">
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            className="display-products"
                          >
                            Product Quantity
                          </Typography>
                        </th>
                        <td className="customize-table">
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            className="display-products"
                          >
                            {res.data().productQuantity}
                          </Typography>
                        </td>
                      </tr>
                      <tr>
                        <th className="customize-table">
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            className="display-products"
                          >
                            Product Calories
                          </Typography>
                        </th>
                        <td className="customize-table">
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            className="display-products"
                          >
                            {res.data().productCalories}
                          </Typography>
                        </td>
                      </tr>
                    </table>
                  </CardContent>
                  {currentUser.status === "doctor" ? (
                    <CardActions sx={{ textAlign: "end" }}>
                      <Button size="small" onClick={() => handleDelete(res.id)}>
                        <DeleteOutlineOutlinedIcon sx={{ color: "hotpink" }} />
                      </Button>
                    </CardActions>
                  ) : (
                    ""
                  )}
                </Card>
              </Animated>
            </>
          );
        })}
      </div>
      <Dialog
        onClose={() => {
          setOpen(!open);
        }}
        open={open}
        className="dashboard-dialog"
      >
        <form onSubmit={handleSubmit} autoComplete="off">
          <Stack
            width="400px"
            spacing={4}
            padding="20px"
            background="transparent"
          >
            <TextField placeholder="Product Name" name="productName" />
            <TextField
              placeholder="Product Quantity 1kg 2lit etc.."
              name="productQuantity"
            />
            <TextField placeholder="Product Calories" name="productCalories" />
            <TextField
              type="file"
              placeholder="Choose Product Image"
              name="productImage"
            />
            <Button className="buttons" type="submit">
              Upload
            </Button>
          </Stack>
        </form>
      </Dialog>
    </div>
  );
};

export default Dashboard;
