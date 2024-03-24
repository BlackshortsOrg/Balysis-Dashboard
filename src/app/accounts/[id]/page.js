"use client";
import React from "react";
import ProfileCard from "@/components/ProfileScreen/ProfileCard";
import { getUserDetails } from "@/api/getUserDetails";
import { useParams } from "next/navigation";
import { get } from "lodash";

const Profile = () => {
    const param = useParams();
  return (
    <div>
      <ProfileCard param={param} />
    </div>
  );
};

export default Profile;
