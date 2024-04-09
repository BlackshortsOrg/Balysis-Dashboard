"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Switch } from "../ui/switch"

export default function GttOrder({ stock, preset, closeDialog }) {
  const gttOrderSchema = z.object({
    side: z.enum(["BUY", "SELL"], { required_error: "Side is required" }),
    gtt_type: z.enum(["SINGLE", "OCO"], { required_error: "GTT Type is required" }),
  })
  const form = useForm({ resolver: zodResolver(gttOrderSchema), defaultValues: { side: "BUY", gtt_type: "SINGLE" } })
  const side_watcher = form.watch("side")
  const gtt_type_watcher = form.watch("gtt_type")
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => console.log(data))}>
          <div className="w-full grid grid-cols-12">
            <div className="col-span-4">
              <div className="my-3">Transaction Type</div>
              <FormField control={form.control} name="side" render={({ field }) => (
                <FormItem>
                  <FormControl className="w-full">
                    <RadioGroup className="grid grid-cols-8" onValueChange={field.onChange} defaultValue={field.value}>
                      <FormItem className="col-span-4 flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="BUY" />
                        </FormControl>
                        <FormLabel className="hover:cursor-pointer">
                          BUY
                        </FormLabel>
                      </FormItem>
                      <FormItem className="col-span-4 flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="SELL" />
                        </FormControl>
                        <FormLabel className="hover:cursor-pointer">
                          SELL
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )} />
            </div>
            <div className="col-start-6 col-span-7">
              <div className="my-3">Trigger Type</div>
              <FormField control={form.control} name="gtt_type" render={({ field }) => (
                <FormItem>
                  <FormControl className="w-full">
                    <RadioGroup className="grid grid-cols-8" onValueChange={field.onChange} defaultValue={field.value}>
                      <FormItem className="col-span-4 flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="SINGLE" />
                        </FormControl>
                        <FormLabel className="hover:cursor-pointer">
                          Single
                        </FormLabel>
                      </FormItem>
                      <FormItem className="col-span-4 flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem disabled={side_watcher === "BUY"} value="OCO" />
                        </FormControl>
                        <FormLabel className="hover:cursor-pointer">
                          OCO
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription className="text-xs">{gtt_type_watcher === "SINGLE" ? "The order is placed when the Last Traded Price (LTP) crosses the trigger price. Can be used to enter or exit a position." : "One Cancels Other: Either the stoploss or the target order is placed when the Last Traded Price (LTP) crosses the respective trigger. Can be used to set target and stoploss for a position/holding."}</FormDescription>
                </FormItem>
              )} />
            </div>
          </div>
          <div className="w-full grid grid-cols-12 my-3">
            <div className="col-span-6"><div className="px-2 text-[#844aeb] bg-[#844aeb]/10 w-fit font-semibold">{gtt_type_watcher === "OCO" ? "Target" : ""}</div></div>
            <div className="col-span-3">{stock?.segment == "EQ" ? "CNC" : "NRML"}</div>
            <div className="col-span-3">LIMIT</div>
            <div className="col-span-3">
              <FormField control={form.control} name="target_trigger_price" render={({ field }) => (
                <div className="">
                  <FormItem className="">
                    <FormLabel className="hover:cursor-pointer">
                      Trigger Price</FormLabel>
                    <FormControl>
                      <Input value={field.value} onChange={(e) => field.onChange(parseFloat(e.target.value) < 0 ? 0 : parseFloat(e.target.value))} type="number" placeholder="Enter Trigger Price" step={0.05} defaultValue={0.0} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )} />
            </div>
            <div className="col-span-3 mx-auto mt-8 text-sm">
              Places Order {'-->'}
            </div>
            <div className="col-span-6 flex gap-2">
              <FormField control={form.control} name="quantity" render={({ field }) => (
                <div className="">
                  <FormItem className="">
                    <FormLabel className="hover:cursor-pointer">
                      Quantity</FormLabel>
                    <FormControl>
                      <Input value={field.value} onChange={(e) => field.onChange(parseFloat(e.target.value) < 0 ? 0 : parseFloat(e.target.value))} type="number" placeholder="Enter Trigger Price" step={stock?.lotsize || 1} defaultValue={0.0} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )} />
              <FormField control={form.control} name="target_price" render={({ field }) => (
                <div className="">
                  <FormItem className="">
                    <FormLabel className="hover:cursor-pointer">
                      Price</FormLabel>
                    <FormControl>
                      <Input value={field.value} onChange={(e) => field.onChange(parseFloat(e.target.value) < 0 ? 0 : parseFloat(e.target.value))} type="number" placeholder="Enter Trigger Price" step={0.05} defaultValue={0.0} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )} />
            </div>
          </div>
          {gtt_type_watcher === "OCO" && (
            <div className="w-full grid grid-cols-12 my-3">
              <div className="col-span-6"><div className="text-[#844aeb] bg-[#844aeb]/10 w-fit font-semibold">{gtt_type_watcher === "OCO" ? "Stoploss" : ""}</div></div>
              <div className="col-span-3">{stock?.segment == "EQ" ? "CNC" : "NRML"}</div>
              <div className="col-span-3">LIMIT</div>
              <div className="col-span-3">
                <FormField control={form.control} name="stoploss_trigger_price" render={({ field }) => (
                  <div className="">
                    <FormItem className="">
                      <FormLabel className="hover:cursor-pointer">
                        Trigger Price</FormLabel>
                      <FormControl>
                        <Input value={field.value} onChange={(e) => field.onChange(parseFloat(e.target.value) < 0 ? 0 : parseFloat(e.target.value))} type="number" placeholder="Enter Trigger Price" step={0.05} defaultValue={0.0} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                )} />
              </div>
              <div className="col-span-3 mx-auto mt-8 text-sm">
                Places Order {'-->'}
              </div>
              <div className="col-span-6 flex gap-2">
                <FormField control={form.control} name="stop_loss_quantity" render={({ field }) => (
                  <div className="">
                    <FormItem className="">
                      <FormLabel className="hover:cursor-pointer">
                        Quantity</FormLabel>
                      <FormControl>
                        <Input value={field.value} onChange={(e) => field.onChange(parseFloat(e.target.value) < 0 ? 0 : parseFloat(e.target.value))} type="number" placeholder="Enter Quantity" step={stock?.lotsize || 1} defaultValue={0.0} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                )} />
                <FormField control={form.control} name="target_price" render={({ field }) => (
                  <div className="">
                    <FormItem className="">
                      <FormLabel className="hover:cursor-pointer">
                        Price</FormLabel>
                      <FormControl>
                        <Input value={field.value} onChange={(e) => field.onChange(parseFloat(e.target.value) < 0 ? 0 : parseFloat(e.target.value))} type="number" placeholder="Enter Trigger Price" step={0.05} defaultValue={0.0} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                )} />
              </div>
            </div>
          )}
          <Button variant={side_watcher === "SELL" ? "sellButton" : "buyButton"} type="submit">{side_watcher === "SELL" ? "SELL" : "BUY"}</Button>
        </form>
      </Form>
    </div>
  )
}
