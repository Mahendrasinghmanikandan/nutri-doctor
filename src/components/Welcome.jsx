import React from "react";
import { useSelector } from "react-redux";
import { Animated } from "react-animated-css";
const Welcome = () => {
  const currentUser = useSelector((data) => data.auth.values.user);
  return (
    <div className="welcome-message">
      <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
        <img
          width="200px"
          height="200px"
          src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Foods_-_Idil_Keysan_-_Wikimedia_Giphy_stickers_2019.gif"
          alt=""
        />
        <h4>Welcome {currentUser.name}</h4>
      </Animated>
    </div>
  );
};

export default Welcome;
