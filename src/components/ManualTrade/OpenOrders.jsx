import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllUsers } from "@/api/getAllUsers";

export default function OpenOrders() {
  const [user, setUsers] = useState([]);
  const [token, setToken] = useState("");
  async function checkLogin() {
    if (sessionStorage.getItem("token") === null) {
      window.location.href = "/login";
    } else {
      const tk = sessionStorage.getItem("token");
      setToken(tk);
      return tk;
    }
  }
  useEffect(() => {
    checkLogin().then((token) => {
      setToken(token);
      getAllUsers(token).then((data) => {
        setUsers(data);
      });
    });
  }, []);
  return (
    <div>
      <Tabs defaultValue="account" className="">
        <TabsList>
          {user.map((user) => {
            return <TabsTrigger value={user.name}>{user.name}</TabsTrigger>;
          })}
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
