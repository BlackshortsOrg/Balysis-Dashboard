import { React, useState, useEffect } from "react";
import Image from "next/image";
import ProfilePic from "../../public/profileScreenSvgs/profilePic.svg";
import Location from "../../public/profileScreenSvgs/Location.svg";
import Person from "../../public/profileScreenSvgs/person.svg";
import Mail from "../../public/profileScreenSvgs/mail.svg";
import Cake from "../../public/profileScreenSvgs/cake.svg";
import Phone from "../../public/profileScreenSvgs/Call.svg";
import { getUserDetails } from "@/api/getUserDetails";
import { get } from "lodash";

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
    setUserDetails(data);
    console.log(data, userDetails);
  }
  return (
    <>
      <div className="w-[75vw] h-[35vh] ml-[3.5vw] mt-[10vh] relative bg-stone-300 rounded-[5px]">
        <div className="relative">
          <Image
            className="w-[12rem] h-[12.3rem] ml-[5vw] mt-[16vh] bg-amber-400 rounded-full"
            width={"175"}
            height={"179"}
            src={ProfilePic}
            alt="Profile Picture"
          />
          <div className="w-[15rem] h-[2.5rem] relative ml-[15vw] text-sky-400 text-3xl font-bold font-['Montserrat']">
            {userDetails && userDetails[0].name}
          </div>
          <div className="w-[11rem] h-[1.6rem] relative ml-[15vw] opacity-70 text-sky-400 text-base font-normal font-['Montserrat']">
            {userDetails && userDetails[0].description}
          </div>
        </div>
        <div className="flex row-span-2 w-[60vw] justify-between">
          <div className="mt-[8vh] ml-[3vw] text-sky-400 text-2xl font-bold font-['Nunito']">
            About
          </div>
          <div className="w-[14rem] h-15 mt-[8vh] flex row-auto justify-start opacity-70 text-black text-base font-normal font-['Montserrat']">
            <Image
              className="mr-2"
              width={"17"}
              height={"15"}
              src={Location}
              alt="location"
            />
            {userDetails && userDetails[0].aadhar}
          </div>
        </div>
        <div className="flex row-span-2 w-[60vw] justify-between">
          <div className="w-[14rem] h-15 mt-[2vh] ml-[3vw] flex row-auto justify-start opacity-70 text-black text-base font-normal font-['Montserrat']">
            <Image
              className="mr-2"
              width={"17"}
              height={"15"}
              src={Person}
              alt="gender"
            />
            {userDetails && userDetails[0].pan}
          </div>
          <div className="w-[14rem] h-15 mt-[2vh] flex row-auto justify-start opacity-70 text-black text-base font-normal font-['Montserrat']">
            <Image
              className="mr-2"
              width={"17"}
              height={"15"}
              src={Mail}
              alt="mail"
            />
            {userDetails && userDetails[0].email}
          </div>
        </div>
        <div className="flex row-span-2 w-[60vw] justify-between">
          <div className=" w-[14rem] h-0 mt-[1vh] ml-[3vw] opacity-10 border border-slate-950"></div>
          <div className=" w-[14rem] h-0 mt-[1vh] opacity-10 border border-slate-950"></div>
        </div>
        <div className="flex row-span-2 w-[60vw] justify-between">
          <div className="w-[14rem] h-15 mt-[2vh] ml-[3vw] flex row-auto justify-start opacity-70 text-black text-base font-normal font-['Montserrat']">
            <Image
              className="mr-2"
              width={"17"}
              height={"15"}
              src={Cake}
              alt="birth date"
            />
            {userDetails && userDetails[0].broker}
          </div>
          <div className="w-[14rem] h-15 mt-[2vh] flex row-auto justify-start opacity-70 text-black text-base font-normal font-['Montserrat']">
            <Image
              className="mr-2"
              width={"17"}
              height={"15"}
              src={Phone}
              alt="Phone Number"
            />
            {userDetails && userDetails[0].phone}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
