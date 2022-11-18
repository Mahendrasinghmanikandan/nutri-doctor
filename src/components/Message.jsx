import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
} from "@mui/material";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { change } from "../Features/authSlice";
import { useSelector } from "react-redux";
import moment from "moment";

import { useDispatch } from "react-redux";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import Profile from "./Profile";
const Message = ({ current_User, currentChat, current_name, fullData }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [data, setData] = useState([]);
  const [viewDetails, setViewDetails] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const currentUser = useSelector((data) => data.auth.values.user);
  const ids =
    current_User?.length >= currentChat?.length
      ? current_User + currentChat
      : currentChat + current_User;
  var date = new Date();
  var current_date =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  var current_time =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  var date_time = current_date + " " + current_time;
  const handleSend = async () => {
    const formData = {
      sender: current_User,
      receiver: currentChat,
      uid: ids,
      chat: currentMessage,
      date: date_time,
    };
    try {
      await setDoc(doc(db, "users-messages", uid()), formData);
      setCurrentMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchData = async () => {
    try {
      const q = query(
        collection(db, "users-messages"),
        where("uid", "==", ids)
      );
      onSnapshot(q, (querySnapshot) => {
        const msg = [];
        querySnapshot.forEach((doc) => {
          msg.push(doc.data());
        });
        setData(msg);
      });
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="message">
      <div className="message_header">
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            setViewDetails(!viewDetails);
          }}
        >
          <Avatar>{current_name?.split("")[0].toUpperCase()}</Avatar>
          <h4>{current_name}</h4>
        </Stack>
        <div>
          <div className="logout-button">
            <Button
              variant="outlined"
              className="buttons"
              size="large"
              onClick={() => {
                console.log("enter");
                dispatch(change({ user: {} }));
                navigation("/login");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      {viewDetails ? (
        <Profile fullData={fullData} />
      ) : (
        <>
          <div className="private-chats">
            <List sx={{ width: "100%", maxWidth: 360 }}>
              {data
                .sort((a, b) => {
                  return new Date(b.date) - new Date(a.date);
                })
                .map((res) => {
                  return (
                    <ListItem className="msgs">
                      <ListItemAvatar>
                        <Avatar>
                          {currentUser.name?.split("")[0].toUpperCase()}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={res.chat}
                        secondary={moment(res.date).format("LLL")}
                      />
                    </ListItem>
                  );
                })}
            </List>
          </div>
          <Stack className="send-box" direction="row" spacing={1}>
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => {
                setCurrentMessage(e.target.value);
              }}
            />
            <Button onClick={handleSend} className="buttons" variant="outlined">
              send
            </Button>
          </Stack>
        </>
      )}
    </div>
  );
};

export default Message;
