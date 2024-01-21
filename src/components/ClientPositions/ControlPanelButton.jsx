import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon, Pencil2Icon, GearIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function ControlPanelButton() {
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
            Here you can square off all positions for all accounts and this is a kill switch, this action is not reversible.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-12 text-center">
          <div className="col-span-4 border font-semibold hover:text-white hover:cursor-pointer hover:bg-[#FF2241] hover:border-black border-[#FF2241] mx-2 py-4 rounded-lg">
            Square Off All Positions
          </div>
          <div className="col-span-4 border font-semibold hover:text-white hover:cursor-pointer hover:bg-[#FF2241] hover:border-black border-[#FF2241] mx-2 py-4 rounded-lg">
            Convert NRML to MIS
          </div>
          <div className="col-span-4 border font-semibold hover:text-white hover:cursor-pointer hover:bg-[#FF2241] hover:border-black border-[#FF2241] mx-2 py-4 rounded-lg">
            Convert MIS to NRML
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
