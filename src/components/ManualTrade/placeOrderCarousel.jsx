"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { toast } from "sonner";
import { placeTradeAPI } from "@/api/placeTrade";
export default function PlaceOrderCarousel({
  stock,
  preset,
  closeDialog,
  toggleRefresh,
  userData,
  rowSelection,
  token,
  presetsObj,
}) {
  const productTypeSchema = z.object({
    product_type: z.enum(["CNC", "INTRADAY"], {
      required_error: "Product Type is required",
    }),
    qty: z
      .number({
        required_error: "Quantity is required",
      })
      .int()
      .positive("Quantity should be positive")
      .multipleOf(
        stock?.lotsize || 1,
        `Not A Multiple of ${stock?.lotsize || 1}`,
      )
      .min(1, "Quantity should be greater than 0"),
    limit_price: z
      .number()
      .multipleOf(0.05, `Not A Multiple of 0.05`)
      .positive()
      .or(z.number().min(0).max(0)),
    stop_price: z
      .number()
      .multipleOf(0.05, `Not a Multiple of 0.05`)
      .positive()
      .or(z.number().min(0).max(0)),
    order_type: z.enum(
      ["MARKET_ORDER", "LIMIT_ORDER", "STOP_LIMIT_ORDER", "STOP_ORDER"],
      {
        required_error: "Order Type is required",
      },
    ),
    side: z.boolean({ required_error: "Side is required" }),
  });
  const form = useForm({
    resolver: zodResolver(productTypeSchema),
    defaultValues: {
      order_type: "MARKET_ORDER",
      product_type: "INTRADAY",
      limit_price: 0.0,
      stop_price: 0.0,
      side: true,
    },
  });
  const order_type = form.watch("order_type");
  const side_state = form.watch("side");

  const newTradeAPI = async (data) => {
    console.log(data);
    console.log(preset);
    console.log(stock);
    console.log(rowSelection);
    console.log(userData);
    if (!stock) {
      toast.error("Stock not chosen");
      return;
    }
    if (!preset) {
      toast.error("Preset not chosen");
      return;
    }
    if (preset == "None" && rowSelection.length == 0) {
      toast.error("No User selected for NONE preset");
      closeDialog();
      return;
    }
    const actual_product_type =
      data.product_type === "CNC" &&
      (stock.segment === "OPT" || stock.segment === "FUT")
        ? "NRML"
        : data.product_type;
    if (preset == "None") {
      const selectedIDs = Object.keys(rowSelection).map((key) =>
        parseInt(userData[key].id),
      );
      const tradeObj = {
        exchange: stock.exchange,
        symbol: stock.symbol,
        segment: stock.segment,
        signal_type: "NEW_ORDER",
        product_type: actual_product_type,
        order_type: data.order_type,
        limit_price: data.limit_price,
        stop_price: data.stop_price,
        users: selectedIDs,
        quantity: data.qty,
        side: data.side ? -1 : 1,
      };
      console.log(tradeObj);
      closeDialog();
      toast.promise(placeTradeAPI(tradeObj, token), {
        loading: "Placing Trades",
        success: "Trades Placed Successfully",
        error: "Failed to place trades",
      });
    } else {
      closeDialog();
      for (const user of presetsObj[preset]) {
        const tradeObj = {
          exchange: stock.exchange,
          symbol: stock.symbol,
          segment: stock.segment,
          signal_type: "NEW_ORDER",
          product_type: actual_product_type,
          order_type: data.order_type,
          limit_price: data.limit_price,
          stop_price: data.stop_price,
          users: [user.user_id],
          quantity: data.qty * user.multiplier,
          side: data.side ? -1 : 1,
        };
        console.log(tradeObj);
        toast.promise(placeTradeAPI(tradeObj, token), {
          loading: "Placing Trades",
          success: "Trades Placed Successfully",
          error: "Failed to place trades",
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(newTradeAPI)}>
        {/* <div className="w-full"> */}
        {/*   Tabs */}
        {/* </div> */}
        <div className="w-full grid grid-cols-12 mt-4">
          <FormField
            control={form.control}
            name="product_type"
            render={({ field }) => (
              <FormItem className="col-span-8">
                <FormControl className="w-full">
                  <RadioGroup
                    className="grid grid-cols-8"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormItem className="col-span-4 flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="INTRADAY" />
                      </FormControl>
                      <FormLabel className="hover:cursor-pointer">
                        Intraday (MIS)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="col-span-4 flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="CNC" />
                      </FormControl>
                      <FormLabel className="hover:cursor-pointer">
                        {stock?.segment === "OPT" || stock?.segment === "FUT"
                          ? "Overnight (NRML)"
                          : "Longterm (CNC)"}
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="side"
              render={({ field }) => (
                <div className="col-span-4">
                  <FormItem>
                    <FormControl className="">
                      <div className="flex gap-2">
                        BUY
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        SELL
                      </div>
                    </FormControl>
                  </FormItem>
                </div>
              )}
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-12 gap-2 mt-4">
          <FormField
            control={form.control}
            name="qty"
            render={({ field }) => (
              <div className="col-span-4">
                <FormItem className="col-span-4">
                  <FormLabel>
                    Quantity
                    {stock?.segment === "OPT" || stock?.segment === "FUT"
                      ? ` (Lot Size: ${stock.lotsize})`
                      : ""}
                  </FormLabel>
                  <FormControl>
                    <Input
                      value={field.value}
                      step={stock?.lotsize || 1}
                      onChange={(e) => {
                        const new_val = parseInt(e.target.value);
                        const tick = stock?.lotsize || 1;
                        if (new_val >= 0) {
                          field.onChange(Math.round(new_val / tick) * tick);
                        } else {
                          field.onChange(0);
                        }
                      }}
                      type="number"
                      placeholder="Enter Quantity"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="limit_price"
            render={({ field }) => (
              <div className="col-span-4">
                <FormItem className="col-span-4">
                  <FormLabel className="hover:cursor-pointer">
                    {order_type === "MARKET_ORDER" ? "Market Price" : "Price"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={
                        order_type === "MARKET_ORDER" ||
                        order_type === "STOP_ORDER"
                      }
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(
                          parseFloat(e.target.value) < 0
                            ? 0
                            : parseFloat(e.target.value),
                        )
                      }
                      type="number"
                      placeholder="Enter Price"
                      step={0.05}
                      defaultValue={0.0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="stop_price"
            render={({ field }) => (
              <div className="col-span-4">
                <FormItem className="col-span-4">
                  <FormLabel className="hover:cursor-pointer">
                    Trigger Price
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={
                        order_type === "MARKET_ORDER" ||
                        order_type === "LIMIT_ORDER"
                      }
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(
                          parseFloat(e.target.value) < 0
                            ? 0
                            : parseFloat(e.target.value),
                        )
                      }
                      type="number"
                      placeholder="Enter Trigger Price"
                      step={0.05}
                      defaultValue={0.0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
        </div>
        <div className="w-full mt-2">
          <FormField
            control={form.control}
            name="order_type"
            render={({ field }) => (
              <div className="">
                <FormItem>
                  <FormControl className="w-full grid grid-cols-12">
                    <RadioGroup
                      onValueChange={(e) => {
                        if (e == "MARKET_ORDER") {
                          form.setValue("limit_price", 0.0);
                          form.setValue("stop_price", 0.0);
                        } else if (e == "LIMIT_ORDER") {
                          form.setValue("stop_price", 0.0);
                        } else if (e == "STOP_ORDER") {
                          form.setValue("limit_price", 0.0);
                        } else if (e == "STOP_LIMIT_ORDER") {
                          form.setValue("limit_price", 0.0);
                        }
                        field.onChange(e);
                      }}
                      defaultValue={field.value}
                    >
                      <div className="col-start-5 col-end-9 w-full grid grid-cols-12">
                        <FormItem className="flex items-center space-x-3 space-y-0 col-span-6">
                          <FormControl>
                            <RadioGroupItem value="MARKET_ORDER" />
                          </FormControl>
                          <FormLabel className="hover:cursor-pointer">
                            Market
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 col-span-6">
                          <FormControl>
                            <RadioGroupItem value="LIMIT_ORDER" />
                          </FormControl>
                          <FormLabel className="hover:cursor-pointer">
                            Limit
                          </FormLabel>
                        </FormItem>
                      </div>
                      <div className="col-start-10 col-end-13">
                        <div className="w-full grid grid-cols-12">
                          <FormItem className="col-span-6 flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="STOP_LIMIT_ORDER" />
                            </FormControl>
                            <FormLabel className="hover:cursor-pointer">
                              SL
                            </FormLabel>
                          </FormItem>
                          <FormItem className="col-span-6 flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="STOP_ORDER" />
                            </FormControl>
                            <FormLabel className="hover:cursor-pointer">
                              SL-M
                            </FormLabel>
                          </FormItem>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
        </div>
        <Button variant={side_state ? "sellButton" : "buyButton"} type="submit">
          {side_state ? "SELL" : "BUY"}
        </Button>
      </form>
    </Form>
  );
}
