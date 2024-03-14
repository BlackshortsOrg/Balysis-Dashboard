"use client"
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Disclosure } from "@headlessui/react"
import { AiFillCaretDown } from "react-icons/ai"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"


const sets = () => {
  return (
    <div className="bg-[#F8FCFF] w-full h-[100vh] overflow-auto">
      <div className="w-full pt-10">
        <h1 className="pl-[50px] font-bold text-2xl">Sets</h1>
      </div>
      <div className="px-[50px]">
        <Card className="shadow-lg my-4">
          <CardContent>
            <Disclosure>
              <Disclosure.Button className="py-2 text-lg font-bold flex">
                Set BNF <AiFillCaretDown className="pt-2" />
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
                    <TableRow>
                      <TableCell className="font-medium">1</TableCell>
                      <TableCell>
                        <div className="flex flex-row items-center">
                          <Image
                            className="rounded-full"
                            src="/images/dummy.png"
                            width={40}
                            height={40}
                          />
                          <a
                            className="ml-2 hover:underline"
                          >
                            Esharky
                          </a>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input type="number" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

              </Disclosure.Panel>
            </Disclosure>
          </CardContent>
        </Card>
        <Card className="shadow-lg my-4">
          <CardContent>
            <p className="text-lg font-bold">Set BNF</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default sets
