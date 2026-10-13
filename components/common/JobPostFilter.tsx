import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { format } from "node:url";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";

const jobType = [
  { value: "FULL_TIME", label: "Full-time" },
  { value: "PART_TIME", label: "Part-time" },
  { value: "CONTRACT", label: "Contract" },
  { value: "INTERNSHIP", label: "Internship" },
  { value: "TEMPORARY", label: "Temporary" },
  { value: "FREELANCE", label: "Freelance" },
] as const;

const experienceOptions = [
  { value: "ENTRY_LEVEL", label: "Entry level" },
  { value: "JUNIOR", label: "Junior" },
  { value: "MID_LEVEL", label: "Mid level" },
  { value: "SENIOR", label: "Senior" },
  { value: "LEAD", label: "Lead" },
  { value: "EXECUTIVE", label: "Executive" },
] as const;

export function JobFilterComponent() {
  return (
    <Card className="col-span-1 h-fit">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">Filter Docs</CardTitle>
        <Button variant="destructive" size="sm" className="h-8">
          <span>Clear All</span>
          <XIcon className="size-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label className="text-lg font-semibold">Job Type</Label>
          <div className="grid grid-cols-2 gap-2">
            {jobType.map((data) => (
              <div key={data.label} className="flex items-center gap-2">
                <Checkbox id={data.value} />
                <Label htmlFor={data.value}>{data.label}</Label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-lg font-semibold">Expericen</Label>
          <div className="grid grid-cols-2 gap-2">
            {experienceOptions.map((data) => (
              <div key={data.label} className="flex items-center gap-2">
                <Checkbox id={data.value} />
                <Label htmlFor={data.value}>{data.label}</Label>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          <div>
            <label htmlFor="location">Enter a Location</label>
            <Input type="text" name="location" placeholder="Patna Bihar" />
          </div>
          <Button>
             Search
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
