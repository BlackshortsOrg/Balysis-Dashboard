import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createUserAPI } from "@/api/createUser";

const addUserButton = () => {
  async function checkLogin() {
    if (sessionStorage.getItem("token") === null) {
      window.location.href = "/login";
    } else {
      return sessionStorage.getItem("token");
    }
  }
  const [username, setUsername] = useState("John Doe");
  const [broker, setBroker] = useState("fyers");
  const [clientId, setClientId] = useState("FY1234");
  const [secretId, setSecretId] = useState("FY1234");

  const createUserApiCall = async (e) => {
    const token = await checkLogin();
    e.preventDefault();
    //TODO Loading Spinner
    const res = await createUserAPI(
      username,
      broker,
      clientId,
      secretId,
      token,
    );
    console.log(res);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="addUser">
          <PlusIcon />
          <span>Add user</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>
            Add Details of the user you want to add like Name,Broker,Client ID
            etc
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Brokers
            </Label>
            <span className="col-span-2">
              <Image
                className={
                  "rounded-full border-2 inline-block" +
                  (broker == "fyers" ? " border-[4px] border-green-300" : "")
                }
                onClick={() => setBroker("fyers")}
                src="/images/fyers.jpeg"
                width={80}
                height={80}
              />
              <Image
                className={
                  "rounded-full border-2 inline-block" +
                  (broker == "zerodha" ? " border-[4px] border-green-300" : "")
                }
                onClick={() => setBroker("zerodha")}
                src="/images/zerodhalogo.png"
                width={80}
                height={80}
              />
              <Image
                className={
                  "rounded-full border-2 inline-block" +
                  (broker == "iifl" ? " border-[4px] border-green-300" : "")
                }
                onClick={() => setBroker("iifl")}
                src="/images/iifllogo.jpeg"
                width={80}
                height={80}
              />
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="clientid" className="text-right">
              Client ID
            </Label>
            <Input
              id="clientid"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="col-span-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="secretid" className="text-right">
            Secret ID
          </Label>
          <Input
            id="secretid"
            value={secretId}
            onChange={(e) => setSecretId(e.target.value)}
            className="col-span-2"
          />
        </div>
        <DialogFooter>
          <Button variant="addUser" type="submit" onClick={createUserApiCall}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default addUserButton;
