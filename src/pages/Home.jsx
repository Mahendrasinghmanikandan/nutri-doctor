import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Avatar, Button, Stack } from "@mui/material";
import Welcome from "../components/Welcome";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Animated } from "react-animated-css";
import _ from "lodash";

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
    // console.log(value, name, data);
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
            {startChat ? (
              <>
                <b>{currentUser?.name}</b>
              </>
            ) : (
              <h4>
                <span>N</span>utri <span>D</span>octor
              </h4>
            )}
          </div>

          <div className="members">
            {data.map((res) => {
              return (
                <>
                  <Animated
                    animationIn="zoomIn"
                    animationOut="fadeOut"
                    isVisible={true}
                  >
                    <div
                      className={
                        currentChat === res.gmail
                          ? " members-card current-chat"
                          : "members-card"
                      }
                      onClick={() => handleStartChat(res.gmail, res.name, res)}
                    >
                      <Avatar
                        sx={
                          currentChat === res.gmail && {
                            bgcolor: "white",
                            color: "black",
                          }
                        }
                      >
                        {res?.name?.split("")[0].toUpperCase()}
                      </Avatar>
                      <h4 style={{ textTransform: "capitalize" }}>
                        {res.name}
                      </h4>
                    </div>
                  </Animated>
                </>
              );
            })}
          </div>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-around"
          >
            {" "}
            {/* <h4>{currentUser.name}</h4> */}
            {/* <div className="logout-button">
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
            </div> */}
          </Stack>
        </div>
        <div className="right">
          {!startChat ? (
            <Welcome />
          ) : (
            <Animated
              animationIn="zoomIn"
              animationOut="fadeOut"
              isVisible={true}
            >
              <Message
                current_User={current_User}
                current_name={current_name}
                currentChat={currentChat}
                fullData={fullData}
              />
            </Animated>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
