import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Listbox } from "@headlessui/react";

const product_types = ['CNC', 'INTRADAY', 'MARGIN']

export default function PlaceOrderCarousel({ side, setSide, limit_price, setLimitPrice, stop_price, setStopPrice, product_type, setProductType, qty, setQty }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Place Order</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="">
          <span className="bg-green-300 px-4 py-2 rounded-lg mr-2">
            Buy
          </span>
          <Switch
            checked={side !== 1}
            onCheckedChange={(state) =>
              state ? setSide(-1) : setSide(1)
            }
          />
          <span className="bg-red-300 px-4 py-2 rounded-lg ml-2">
            Sell
          </span>
        </div>
        <div className="flex flex-row">
          <div className="w-20">
            <Label htmlFor="limit_price">Limit Price</Label>
            <Input
              type="number"
              step=".05"
              id="limit_price"
              placeholder="Limit Price"
              value={limit_price}
              onChange={(e) => setLimitPrice(e.target.value)}
            />
          </div>
          <div className="w-20">
            <Label htmlFor="stop_price">Stop Price</Label>
            <Input
              type="number"
              step=".05"
              id="stop_price"
              placeholder="Stop Price"
              value={stop_price}
              onChange={(e) => setStopPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-20">
            <Label htmlFor="qty">Qty</Label>
            <Input
              type="number"
              id="qty"
              placeholder="Qty"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </div>
          <div className="">
            <Listbox value={product_type} onChange={setProductType}>
              <Listbox.Button className="w-full bg-slate-50 border-slate-200 border rounded-xl px-4 py-2 mt-4">{product_type}</Listbox.Button>
              <Listbox.Options className="bg-slate-50 py-1 rounded-xl mt-2 overflow-auto">
                {product_types.map((product_type) => (
                  <Listbox.Option
                    key={product_type}
                    value={product_type}
                    className=""
                  >
                    {product_type}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
