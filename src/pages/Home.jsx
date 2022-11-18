import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Avatar, Button, Stack } from "@mui/material";
import Welcome from "../components/Welcome";
import Message from "../components/Message";

const Home = () => {
  const currentUser = useSelector((data) => data.auth.values.user);
  const [data, setData] = useState([]);
  const [startChat, setStartChat] = useState(false);
  const [current_name, setCurrent_name] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [fullData, setFullData] = useState(null);
  const [current_User] = useState(currentUser.gmail);
  const fetchData = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("status", "!=", currentUser.status)
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
  const handleStartChat = (value, name, data) => {
    setStartChat(true);
    setCurrentChat(value);
    setCurrent_name(name);
    setFullData(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="chat-container">
      <div className="chats">
        <div className="left">
          <div
            className="left-header"
            onClick={() => {
              setStartChat(false);
            }}
          >
            <h4>
              <span>N</span>utri <span>D</span>octor
            </h4>
          </div>
          <div className="members">
            {data.map((res) => {
              return (
                <div
                  className="members-card"
                  onClick={() => handleStartChat(res.gmail, res.name, res)}
                >
                  <Avatar>{res?.name?.split("")[0].toUpperCase()}</Avatar>
                  <h4>{res.name}</h4>
                </div>
              );
            })}
          </div>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
            className="left-header"
          >
            {/* <Avatar>{currentUser?.name?.split("")[0].toUpperCase()}</Avatar> */}
            <h4>{currentUser.name}</h4>
          </Stack>
        </div>
        <div className="right">
          {!startChat ? (
            <Welcome />
          ) : (
            <Message
              current_User={current_User}
              current_name={current_name}
              currentChat={currentChat}
              fullData={fullData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
