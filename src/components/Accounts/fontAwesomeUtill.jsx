import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faToggleOn,
  faToggleOff,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

export const EyeIcon = ({ isVisible, setIsVisible }) => {
  const [isEyeVisible, setIsEyeVisible] = useState(true);
  console.log(isVisible);
  const toggleSwitch = () => {
    setIsEyeVisible(!isEyeVisible);
    setIsVisible(!isVisible)
  };
  return (
    <div>
      <button onClick={toggleSwitch}>
        <FontAwesomeIcon icon={isEyeVisible ? faEyeSlash : faEye} />
      </button>
    </div>
  );
};

export const ToggleButton = (props) => {
  console.log(props.status, "hel");
  const [isToggled, setIsToggled] = useState(props.status);

  const toggleSwitch = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="flex items-center">
      <button className="focus:outline-none" onClick={toggleSwitch}>
        <FontAwesomeIcon
          icon={isToggled ? faToggleOn : faToggleOff}
          className={`${
            isToggled ? "text-green-500" : "text-red-500"
          } text-3xl`}
        />
      </button>
    </div>
  );
};
