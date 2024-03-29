import { React, useState, useEffect } from "react";
import Image from "next/image";
import ProfilePic from "../../public/profileScreenSvgs/profilePic.svg";
import Location from "../../public/profileScreenSvgs/Location.svg";
import Person from "../../public/profileScreenSvgs/person.svg";
import Mail from "../../public/profileScreenSvgs/mail.svg";
import Cake from "../../public/profileScreenSvgs/cake.svg";
import Phone from "../../public/profileScreenSvgs/Call.svg";
import { getUserDetails } from "@/api/getUserDetails";
import { get, isNull } from "lodash";
import {
  faArrowTrendUp,
  faEnvelope,
  faIdCard,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateProfile } from "@/api/updateProfileDetails";

const ProfileCard = ({ param }) => {
  async function checkLogin() {
    if (localStorage.getItem("token") === null) {
      window.location.href = "/login";
    } else {
      const token = localStorage.getItem("token");
      return token;
    }
  }
  useEffect(() => {
    checkLogin().then((token) => {
      fetchData(token);
    });
  }, []);
  const [userDetails, setUserDetails] = useState(null);
  async function fetchData(token) {
    const data = await getUserDetails(get(param, "id"), token);
    setName(data[0].name);
    setDescription(data[0].description);
    setEmail(data[0].email);
    setAadhar(data[0].aadhar);
    setPan(data[0].pan);
    setPhone(data[0].phone);
    setBroker(data[0].broker);
    setUserDetails(data);
  }
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [email, setEmail] = useState();
  const [aadhar, setAadhar] = useState();
  const [pan, setPan] = useState();
  const [phone, setPhone] = useState();
  const [broker, setBroker] = useState();

  const handleEdit = () => {
    setEditMode(true);
  };

  async function handleSave() {
    // Save the updated values to the server
    let updatedDetails = userDetails[0];
    updatedDetails.name = name;
    updatedDetails.description = description;
    updatedDetails.email = email;
    updatedDetails.aadhar = aadhar;
    updatedDetails.pan = pan;
    updatedDetails.phone = phone;
    updatedDetails.broker = broker;
    console.log(updatedDetails);
    const token = localStorage.getItem("token");
    try {
      const res = await updateProfile(token, get(param, "id"), updatedDetails);
      console.log(res);
      if (res.status == 200) {
        alert("Updated Successfully");
        window.location.reload();
      } else {
        alert("Failed to update");
      }
    } catch (e) {
      console.log(e);
    }
    setEditMode(false);
  }

  return (
    <>
      <div className="bg-slate-400 h-[70vh] w-[60vh] ml-[25vw] mt-[10vh]">
        <div className="pt-[12vh] relative flex justify-center text-3xl font-bold text-white">
          {editMode ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent border-b border-white outline-none"
            />
          ) : (
            name
          )}
        </div>
        <div className="pt-2 relative flex justify-center text-base font-normal text-white">
          {editMode ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-transparent border-b border-white outline-none"
            />
          ) : isNull(description) ? (
            "No Description"
          ) : (
            description
          )}
        </div>
        <div className="flex justify-start ml-16 mt-10 relative text-2xl text-indigo-100">
          <FontAwesomeIcon icon={faEnvelope} />
          <div className="ml-6 text-base underline text-white">
            {editMode ? (
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-b border-white outline-none"
              />
            ) : isNull(email) ? (
              "No Email"
            ) : (
              email
            )}
          </div>
        </div>
        <div className="flex justify-start ml-16  mt-4 relative text-2xl text-indigo-100">
          <FontAwesomeIcon icon={faIdCard} />
          <div className="ml-6 text-base underline text-white">
            {editMode ? (
              <input
                type="text"
                value={aadhar}
                onChange={(e) => setAadhar(e.target.value)}
                className="bg-transparent border-b border-white outline-none"
              />
            ) : isNull(aadhar) ? (
              "No Aadhar"
            ) : (
              aadhar
            )}
          </div>
        </div>
        <div className="flex justify-start ml-16 mt-4 relative text-2xl text-indigo-100">
          <FontAwesomeIcon icon={faUser} />
          <div className="ml-6 text-base underline text-white">
            {editMode ? (
              <input
                type="text"
                value={pan}
                onChange={(e) => setPan(e.target.value)}
                className="bg-transparent border-b border-white outline-none"
              />
            ) : isNull(pan) ? (
              "No Pan"
            ) : (
              pan
            )}
          </div>
        </div>
        <div className="flex justify-start ml-16 mt-4 relative text-2xl text-indigo-100">
          <FontAwesomeIcon icon={faPhone} />
          <div className="ml-6 text-base underline text-white">
            {editMode ? (
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-transparent border-b border-white outline-none"
              />
            ) : isNull(phone) ? (
              "No Phone Number"
            ) : (
              phone
            )}
          </div>
        </div>
        <div className="flex justify-start ml-16 mt-4 relative text-2xl text-indigo-100">
          <FontAwesomeIcon icon={faArrowTrendUp} />
          <div className="ml-6 text-base underline text-white uppercase">
            {editMode ? (
              <input
                type="text"
                value={broker}
                onChange={(e) => setBroker(e.target.value)}
                className="bg-transparent border-b border-white outline-none"
              />
            ) : isNull(broker) ? (
              "No Broker"
            ) : (
              broker
            )}
          </div>
        </div>
        {editMode ? (
          <div className="flex justify-center mt-8">
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex justify-center mt-8">
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleEdit}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileCard;
