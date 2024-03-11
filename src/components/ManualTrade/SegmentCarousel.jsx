import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SegmentCarousel({ segment, setSegment, carouselApi }) {
  const unselectedSegmentClasses =
    "col-span-1 text-center shadow-gray-50 border-slate-200 border rounded-xl hover:bg-slate-100 py-4";
  const selectedSegmentClasses =
    "basis-1/4 bg-[#41AFFF] text-white text-center shadow-gray-50 border-slate-200 border rounded-xl py-4 border-4";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chose Segment</CardTitle>
        <CardDescription>
          Chose Segment from Equity,Commodity,Derivatives Options/Futures
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 text-center gap-2">
          <div
            className={
              segment === "Equity"
                ? selectedSegmentClasses
                : unselectedSegmentClasses
            }
            onClick={() => {
              setSegment("Equity")
              carouselApi.scrollNext()
            }}
          >
            Equity
          </div>
          <div
            className={
              segment === "Futures"
                ? selectedSegmentClasses
                : unselectedSegmentClasses
            }
            onClick={() => {
              setSegment("Futures")
              carouselApi.scrollNext()
            }}
          >
            Futures
          </div>
          <div
            className={
              segment === "Options"
                ? selectedSegmentClasses
                : unselectedSegmentClasses
            }
            onClick={() => {
              setSegment("Options")
              carouselApi.scrollNext()
            }}
          >
            Options
          </div>
          <div
            className={
              segment === "Commodity"
                ? selectedSegmentClasses
                : unselectedSegmentClasses
            }
            onClick={() => {
              setSegment("Commodity")
              carouselApi.scrollNext()
            }}
          >
            Commodity
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
