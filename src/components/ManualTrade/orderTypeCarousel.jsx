import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OrderTypeCarousel({ orderType, setOrderType, carouselApi }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chose Order Type</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 text-center gap-2">
          {orderType === "MARKET_ORDER" ? (
            <div className="text-white bg-[#41AFFF] col-span-1 py-4 shadow-gray-50 border-slate-200 border rounded-xl">
              Market Order
            </div>
          ) : (
            <div
              className="col-span-1 py-4 shadow-gray-50 border-slate-200 border rounded-xl hover:bg-slate-100"
              onClick={() => {
                setOrderType("MARKET_ORDER")
                carouselApi.scrollNext()
              }}
            >
              Market Order
            </div>
          )}
          {orderType === "LIMIT_ORDER" ? (
            <div className="text-white bg-[#41AFFF] col-span-1 py-4 shadow-gray-50 border-slate-200 border rounded-xl">
              Limit Order
            </div>
          ) : (
            <div
              className="col-span-1 py-4 shadow-gray-50 border-slate-200 border rounded-xl hover:bg-slate-100"
              onClick={() => {
                setOrderType("LIMIT_ORDER")
                carouselApi.scrollNext()
              }}
            >
              Limit Order
            </div>
          )}
          {orderType === "STOP_ORDER" ? (
            <div className="text-white bg-[#41AFFF] col-span-1 py-4 shadow-gray-50 border-slate-200 border rounded-xl">
              Stop Order
            </div>
          ) : (
            <div
              className="col-span-1 py-4 shadow-gray-50 border-slate-200 border rounded-xl hover:bg-slate-100"
              onClick={() => {
                setOrderType("STOP_ORDER")
                carouselApi.scrollNext()
              }}
            >
              Stop Order
            </div>
          )}
          {orderType === "STOP_LIMIT_ORDER" ? (
            <div className="text-white bg-[#41AFFF] col-span-1 py-4 shadow-gray-50 border-slate-200 border rounded-xl">
              Stop Limit Order
            </div>
          ) : (
            <div
              className="col-span-1 py-4 shadow-gray-50 border-slate-200 border rounded-xl hover:bg-slate-100"
              onClick={() => {
                setOrderType("STOP_LIMIT_ORDER")
                carouselApi.scrollNext()
              }}
            >
              Stop Limit Order
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
