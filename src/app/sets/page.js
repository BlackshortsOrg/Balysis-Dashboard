"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Disclosure } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import checkLogin from "@/lib/checkLogin";
import { getAllUsers } from "@/api/getAllUsers";
import { getAllPresets } from "@/api/getAllPresets";
import { useEffect, useState } from "react";
import { newPresetsAPI } from "@/api/newPresets";
import { updatePresetsAPI } from "@/api/updatePresets";
import { deletePresetsAPI } from "@/api/deletePresets";
import { toast } from "sonner";

const sets = () => {
  const [users, setUsers] = useState({});
  const [presets, setPresets] = useState({});
  const [new_name, setNewName] = useState("BNF2");
  const [token, setToken] = useState("");

  useEffect(() => {
    checkLogin().then((token) => {
      setToken(token);
      getAllUsers(token).then((data) => {
        const users = {};
        for (const user of data) {
          users[user.id] = user;
        }
        setUsers(users);
        getAllPresets(token).then((data) => {
          const new_presets = {};
          for (const [k, v] of Object.entries(data)) {
            new_presets[k] = {};
            for (const obj of v) {
              new_presets[k][obj.user_id] = {
                multiplier: obj.multiplier,
                status: "same",
              };
            }
          }
          setPresets(new_presets);
          console.log(users);
          console.log(new_presets);
        });
      });
    });
  }, []);
  async function updateSet(preset_name) {
    const preset_obj = presets[preset_name];
    const new_presets = {
      multipliers: [],
      user_ids: [],
    };
    const update_presets = {
      user_ids: [],
      multipliers: [],
    };
    const delete_presets = {
      user_ids: [],
    };
    for (const [user_id, obj] of Object.entries(preset_obj)) {
      if (obj.status == "same") {
        continue;
      }
      if (obj.status == "new") {
        new_presets.multipliers.push(obj.multiplier);
        new_presets.user_ids.push(user_id);
      } else if (obj.status == "delete") {
        delete_presets.user_ids.push(user_id);
      } else if (obj.status == "update") {
        update_presets.multipliers.push(obj.multiplier);
        update_presets.user_ids.push(user_id);
      }
    }
    await Promise.all([
      newPresetsAPI(
        token,
        preset_name,
        new_presets.user_ids,
        new_presets.multipliers,
      ),
      updatePresetsAPI(
        token,
        preset_name,
        update_presets.user_ids,
        update_presets.multipliers,
      ),
      deletePresetsAPI(token, preset_name, delete_presets.user_ids),
    ]);
    // toast({
    //   title: "Success",
    //   description: "Set Updated",
    // });
    toast("Set Updated");
  }
  return (
    <div className="bg-[#F8FCFF] w-full h-[100vh] overflow-auto">
      <div className="w-full pt-10">
        <h1 className="pl-[50px] font-bold text-2xl">
          Sets
          <Dialog>
            <DialogTrigger className="bg-[#41AFFF] rounded-lg p-2 text-sm text-white ml-2">
              Add Set
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Chose Name of New Set</DialogTitle>
                {/* <DialogDescription> */}
                {/*   This action cannot be undone. This will permanently delete */}
                {/*   your account and remove your data from our servers. */}
                {/* </DialogDescription> */}
                <Label htmlFor="name" className="text-left">
                  Name
                </Label>
                <Input
                  id="name"
                  value={new_name}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="BNF2"
                  className=""
                />
                <DialogFooter
                  onClick={() => {
                    const new_presets = { ...presets };
                    new_presets[new_name] = {};
                    setPresets(new_presets);
                  }}
                >
                  <DialogClose asChild>
                    <Button variant="addUser">Create</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </h1>
      </div>
      <div className="px-[50px]">
        {Object.entries(presets).map(([preset_name, preset_obj]) => (
          <Card className="shadow-lg my-4">
            <CardContent>
              <Disclosure>
                <Disclosure.Button className="py-2 text-lg font-bold flex">
                  Set {preset_name}
                  <AiFillCaretDown className="pt-2" />
                </Disclosure.Button>
                <Disclosure.Panel className="">
                  <Table>
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">User ID</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Multiplier</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(users).map(([user_id, user]) => {
                        const name = user.name;
                        const multiplier =
                          presets[preset_name][user_id]?.multiplier || 0;
                        return (
                          <TableRow>
                            <TableCell className="font-medium">
                              {user_id}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-row items-center">
                                <Image
                                  className="rounded-full"
                                  src="/images/dummy.png"
                                  width={40}
                                  height={40}
                                />
                                <a className="ml-2 hover:underline">{name}</a>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={multiplier}
                                onChange={(e) => {
                                  e.preventDefault();
                                  const new_presets = { ...presets };
                                  const new_val = parseInt(e.target.value);
                                  if (!new_presets[preset_name][user_id]) {
                                    new_presets[preset_name][user_id] = {
                                      multiplier: new_val,
                                      status: "new",
                                    };
                                    setPresets(new_presets);
                                  } else if (
                                    new_presets[preset_name][user_id].status ===
                                    "new"
                                  ) {
                                    new_presets[preset_name][
                                      user_id
                                    ].multiplier = new_val;
                                    setPresets(new_presets);
                                  } else {
                                    new_presets[preset_name][
                                      user_id
                                    ].multiplier = new_val;
                                    new_presets[preset_name][user_id].status =
                                      new_val == 0 ? "delete" : "update";
                                    setPresets(new_presets);
                                  }
                                  console.log(new_presets);
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                  <Button
                    variant="addUser"
                    onClick={() => {
                      updateSet(preset_name);
                    }}
                  >
                    Save
                  </Button>
                </Disclosure.Panel>
              </Disclosure>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default sets;
