import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GearIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { squareOffAll } from "@/api/squareOffAll";
import { toast } from "sonner";

export default function ControlPanelButton({ token }) {
  async function squareofftoday() {
    squareOffAll(token, otp, false).then((resp) => {
      if (resp.status === 200) {
        toast("Squared Off Today For All");
      } else {
        toast("Failed to square off");
      }
    });
  }
  async function shutdown() {
    squareOffAll(token, otp, true).then((resp) => {
      if (resp.status === 200) {
        toast("Fundhouse Shutdown");
      } else {
        toast("Failed to shutdown");
      }
    });
  }
  const [otp, setOTP] = useState();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="addUser">
          <GearIcon />
          <span className="mx-2">Control Panel</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Master Control Panel</DialogTitle>
          <DialogDescription>
            Here you can square off all positions for all accounts and this is a
            kill switch, this action is not reversible.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-12 text-center">
          <Dialog>
            <DialogTrigger asChild>
              <div className="col-span-6 border font-semibold hover:text-white hover:cursor-pointer hover:bg-[#FF2241] hover:border-black border-[#FF2241] mx-2 py-4 rounded-lg">
                Square Off All Positions Today
              </div>
            </DialogTrigger>
            <DialogContent className="w-full">
              <DialogTitle>Enter PIN For Squareoff All Today</DialogTitle>
              <DialogDescription className="mx-auto">
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
              </DialogDescription>
              <Button variant="addUser" onClick={squareofftoday}>
                Submit
              </Button>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <div className="col-span-6 border font-semibold hover:text-white hover:cursor-pointer hover:bg-[#FF2241] hover:border-black border-[#FF2241] mx-2 py-4 rounded-lg">
                Shutdown Fundhouse
              </div>
            </DialogTrigger>
            <DialogContent className="w-full">
              <DialogTitle>Enter PIN For Fundhouse Shutdown</DialogTitle>
              <DialogDescription className="mx-auto">
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
              </DialogDescription>
              <Button variant="addUser" onClick={shutdown}>
                Submit
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </DialogContent>
    </Dialog>
  );
}
