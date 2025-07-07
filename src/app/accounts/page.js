"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { AiOutlineUser } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { UserTable } from "@/components/Accounts/table";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import AddUserButton from "@/components/Accounts/addUserButton";
import { listUsersAPI } from "@/api/listUsers";
import deleteUserAPI from "@/api/deleteUser";
import { loginIIFLAPI } from "@/api/iifllogin";
import moment from "moment";
import { ToggleButton, EyeIcon } from "@/components/Accounts/fontAwesomeUtill";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const change = (key) => {
  let s = "";
  for (let i = 0; i < key.length; i++) {
    s += "*";
  }
  return s;
};

const accounts = () => {
  const [otp, setOTP] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [toEnableUser, setToEnableUser] = React.useState(-1);
  const [toEnable, setToEnable] = React.useState(false);
  const [refresh, setRefresh] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [token, setToken] = React.useState("");
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ cell, row }) => (
        <div className="flex flex-row items-center relative">
          <div
            className={`${row.original.isactive ? "bg-green-400" : "bg-red-500"
              } h-3 w-3  border-2 border-white z-10 rounded-full absolute bottom-0 left-0`}
          ></div>
          <Image
            className="rounded-full"
            src="/images/dummy.png"
            width={40}
            height={40}
          />

          <p className="ml-2 font-medium">{cell.getValue()}</p>
        </div>
      ),
    },
    {
      header: "Broker",
      accessorKey: "broker",
      cell: ({ cell }) => {
        const broker = cell.getValue();
        if (broker === "fyers") {
          return (
            <div>
              <Image
                className="rounded-full"
                src="/images/fyers.jpeg"
                width={40}
                height={40}
              />
            </div>
          );
        } else if (broker === "zerodha") {
          return (
            <Image
              className="rounded-full"
              src="/images/zerodhalogo.avif"
              width={40}
              height={40}
            />
          );
        } else if (broker === "iifl") {
          return (
            <Image
              className="rounded-full"
              src="/images/iifllogo.jpeg"
              width={40}
              height={40}
            />
          );
        } else if (broker === "jmfinancials") {
          return (
            <Image
              className="rounded-full"
              src="/images/jmfinancial.png"
              width={40}
              height={40}
            />
          );
        }
      },
    },
    {
      header: "Client ID",
      accessorKey: "client_id",
    },
    {
      header: "Secret ID",
      accessorKey: "secret_id",
      cell: ({ cell }) => {
        const [isVisible, setIsVisible] = React.useState(false);

        return (
          <div className="flex justify-around">
            <div>{isVisible ? cell.getValue() : change(cell.getValue())}</div>
            <EyeIcon isVisible={isVisible} setIsVisible={setIsVisible} />
          </div>
        );
      },
    },
    {
      header: "Last Login",
      accessorKey: "last_login",
      cell: ({ cell, row }) => {
        // return <div>{moment(cell.getValue()).format("DD-MM-YYYY h:mm:ss a")}</div>;
        return (
          <div>
            {["iifl", "jmfinancials"].includes(row.original.broker)
              ? "AUTOLOGIN"
              : moment(cell.getValue()).fromNow()}
          </div>
        );
      },
    },
    {
      header: "Active",
      accessorKey: "isactive",
      cell: ({ cell, row }) => {
        // let status = cell.getValue() ? true : false;
        const [status, setStatus] = React.useState(
          cell.getValue() ? true : false,
        );
        const flipStatus = () => {
          setStatus(!status);
          setOpenDialog(true);
          setToEnableUser({ id: row.original.id, name: row.original.name });
          setToEnable(!status);
        };
        return (
          <div className="flex justify-center">
            <ToggleButton status={status} flipStatus={flipStatus} />
          </div>
        );
      },
    },
    {
      id: "crud",
      header: "Actions",
      maxWidth: "80px",
      cell: ({ row }) => {
        const broker = row.original.broker;
        const fyersTokenURL = "http://blackshortsapi.esharky.me:3000/tokens/fyers";
        const fyersRedirectURL = `https://api-t1.fyers.in/api/v3/generate-authcode?client_id=${row.original.client_id}&redirect_uri=${fyersTokenURL}&response_type=code&state=${row.original.id}`;
        const now = new Date(new Date() + 5.5 * 60 * 60 * 1000);
        const [otp, setOTP] = React.useState("");
        const [dialogOpen, setDialogOpen] = React.useState(false);
        return (
          <span className="flex flex-row justify-start w-[170px]">
            {(now.getHours() > 15 ||
              (now.getHours() === 15 && now.getMinutes() > 30)) &&
              !row.original.isactive ? (
              <a className="basis-1/3">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="destructive">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                          fill="currentColor"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      Delete User - {row.original.name}
                    </DialogHeader>
                    <InputOTP maxLength={6} value={otp} onChange={setOTP}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                    <Button
                      variant="addUser"
                      onClick={() => {
                        setDialogOpen(false);
                        deleteUser(row.original.id, otp);
                      }}
                    >
                      Confirm
                    </Button>
                  </DialogContent>
                </Dialog>
              </a>
            ) : (
              <div className="basis-1/3"></div>
            )}
            <a href={`/accounts/${row.original.id}`} className="basis-1/3">
              <Button variant="editUser" className="mx-2 mb-1">
                <AiOutlineUser className="w-[20] h-[20] " />
                {/* <svg */}
                {/*   width="20" */}
                {/*   height="20" */}
                {/*   viewBox="0 0 15 15" */}
                {/*   fill="none" */}
                {/*   xmlns="http://www.w3.org/2000/svg" */}
                {/* > */}
                {/*   <path */}
                {/*     d="M12.1464 1.14645C12.3417 0.951184 12.6583 0.951184 12.8535 1.14645L14.8535 3.14645C15.0488 3.34171 15.0488 3.65829 14.8535 3.85355L10.9109 7.79618C10.8349 7.87218 10.7471 7.93543 10.651 7.9835L6.72359 9.94721C6.53109 10.0435 6.29861 10.0057 6.14643 9.85355C5.99425 9.70137 5.95652 9.46889 6.05277 9.27639L8.01648 5.34897C8.06455 5.25283 8.1278 5.16507 8.2038 5.08907L12.1464 1.14645ZM12.5 2.20711L8.91091 5.79618L7.87266 7.87267L8.12731 8.12732L10.2038 7.08907L13.7929 3.5L12.5 2.20711ZM9.99998 2L8.99998 3H4.9C4.47171 3 4.18056 3.00039 3.95552 3.01877C3.73631 3.03668 3.62421 3.06915 3.54601 3.10899C3.35785 3.20487 3.20487 3.35785 3.10899 3.54601C3.06915 3.62421 3.03669 3.73631 3.01878 3.95552C3.00039 4.18056 3 4.47171 3 4.9V11.1C3 11.5283 3.00039 11.8194 3.01878 12.0445C3.03669 12.2637 3.06915 12.3758 3.10899 12.454C3.20487 12.6422 3.35785 12.7951 3.54601 12.891C3.62421 12.9309 3.73631 12.9633 3.95552 12.9812C4.18056 12.9996 4.47171 13 4.9 13H11.1C11.5283 13 11.8194 12.9996 12.0445 12.9812C12.2637 12.9633 12.3758 12.9309 12.454 12.891C12.6422 12.7951 12.7951 12.6422 12.891 12.454C12.9309 12.3758 12.9633 12.2637 12.9812 12.0445C12.9996 11.8194 13 11.5283 13 11.1V6.99998L14 5.99998V11.1V11.1207C14 11.5231 14 11.8553 13.9779 12.1259C13.9549 12.407 13.9057 12.6653 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.6653 13.9057 12.407 13.9549 12.1259 13.9779C11.8553 14 11.5231 14 11.1207 14H11.1H4.9H4.87934C4.47686 14 4.14468 14 3.87409 13.9779C3.59304 13.9549 3.33469 13.9057 3.09202 13.782C2.7157 13.5903 2.40973 13.2843 2.21799 12.908C2.09434 12.6653 2.04506 12.407 2.0221 12.1259C1.99999 11.8553 1.99999 11.5231 2 11.1207V11.1206V11.1V4.9V4.87935V4.87932V4.87931C1.99999 4.47685 1.99999 4.14468 2.0221 3.87409C2.04506 3.59304 2.09434 3.33469 2.21799 3.09202C2.40973 2.71569 2.7157 2.40973 3.09202 2.21799C3.33469 2.09434 3.59304 2.04506 3.87409 2.0221C4.14468 1.99999 4.47685 1.99999 4.87932 2H4.87935H4.9H9.99998Z" */}
                {/*     fill="currentColor" */}
                {/*     fill-rule="evenodd" */}
                {/*     clip-rule="evenodd" */}
                {/*   ></path> */}
                {/* </svg> */}
              </Button>
            </a>
            {broker === "fyers" ? (
              <a href={fyersRedirectURL} className="basis-1/3">
                <Button variant="addUser" className="" href={fyersRedirectURL}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </Button>
              </a>
            ) : (
              <div className="basis-1/3"> </div>
            )}
          </span>
        );
      },
    },
  ];

  async function checkLogin() {
    if (localStorage.getItem("token") === null) {
      window.location.href = "/login";
    } else {
      const tk = localStorage.getItem("token");
      setToken(tk);
      return tk;
    }
  }
  async function listUsers(token) {
    const data = await listUsersAPI(token);
    for (let i = 0; i < data.length; i++) {
      data[i].active = true;
      data[i].last_login = new Date(data[i].created_at);
    }
    console.log(data);
    data.sort((a, b) => { return a.name > b.name ? 1 : -1 });
    setData(data);
  }
  async function deleteUser(user_id, otp) {
    const res = await deleteUserAPI(token, user_id, otp);
    if (res.status === 200) {
      toast.success("User Deleted Successfully");
    } else {
      toast.error("Failed to delete user");
    }
    setRefresh(!refresh);
  }
  React.useEffect(() => {
    checkLogin().then((token) => {
      listUsers(token);
    });
  }, [refresh]);
  return (
    <div className="h-screen w-full mx-8">
      <h1 className="text-4xl my-4 font-semibold">All Accounts</h1>
      <div className="my-2">
        <AddUserButton refresh={refresh} setRefresh={setRefresh} />
      </div>
      <UserTable
        columns={columns}
        data={data}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        toEnableUser={toEnableUser}
        toEnable={toEnable}
        refresh={refresh}
        setRefresh={setRefresh}
        token={token}
      />
    </div>
  );
};

export default accounts;
