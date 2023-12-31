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
import { useState } from "react";

const addUserButton = () => {
  const [username, setUsername] = useState("John Doe");
  const [broker, setBroker] = useState("fyers");
  const [clientId, setClientId] = useState("FY1234");
  const [secretId, setSecretId] = useState("FY1234");

  const createUserApiCall = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/user/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        client_id: clientId,
        secret_id: secretId,
        // broker,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
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
                width={100}
                height={100}
              />
              <Image
                className={
                  "rounded-full border-2 inline-block" +
                  (broker == "zerodha" ? " border-[4px] border-green-300" : "")
                }
                onClick={() => setBroker("zerodha")}
                src="/images/zerodhalogo.png"
                width={100}
                height={100}
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
