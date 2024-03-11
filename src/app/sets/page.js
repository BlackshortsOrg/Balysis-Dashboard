import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const sets = () => {
  return (
    <div className="bg-[#F8FCFF] w-full h-[100vh] overflow-auto">
      <div className="w-full pt-10">
        <h1 className="pl-[50px] font-bold text-2xl">Sets</h1>
      </div>
      <div className="px-[50px]">
        <Card>
          <CardContent>
            <p className="text-lg font-bold">Set BNF</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default sets
