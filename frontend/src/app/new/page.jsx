"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

const formSchema = z.object({
  coffeePlace: z.string().min(2).max(50),
  location: z.string().min(2).max(50),
  wifi: z.boolean().default(false),
  power: z.boolean().default(false),
  image: z.string(),
});

export default function CoffeePlace() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coffeePlace: "",
      location: "",
      wifi: false,
      power: false,
      image: "",
    },
  });

  async function onSubmit(values) {
    try {
      console.log(values);
      const response = await fetch("http://localhost:5000/cafe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      // Optionally, handle success case (e.g., redirect, show message, etc.)
    } catch (error) {
      console.error("Error:", error);
      // Optionally, handle error case (e.g., show error message, etc.)
    }
  }

  return (
    <div className="p-8 bg-black h-screen">
      <div className="w-full flex items-center">
        <Link href="/" className="text-center text-white text-6xl">
          Lookout
        </Link>
      </div>
      <div className="flex flex-col h-[80vh] justify-center gap-4">
        <h1 className="text-4xl text-white font-semibold">
          Get us the details of the place
        </h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-4 w-full">
            <div className="flex items-start gap-4">
              <div className="flex flex-col gap-2 w-full">
                <Label className="text-white font-medium">Coffee Place</Label>
                <Input
                  className="border-blue-600 bg-transparent text-white"
                  placeholder="Coffee place"
                  {...form.register("coffeePlace")}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label className="text-white font-medium">Location</Label>
                <Input
                  className="border-blue-600 bg-transparent text-white"
                  placeholder="Coffee Location"
                  {...form.register("location")}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-white font-medium">Image URL</Label>
              <Input
                className="border-blue-600 bg-transparent text-white"
                placeholder="Image URL"
                {...form.register("image")}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-white font-medium">Wifi</Label>
                <Controller
                  control={form.control}
                  name="wifi"
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-white font-medium">Power</Label>
                <Controller
                  control={form.control}
                  name="power"
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                  )}
                />
              </div>
            </div>
            <Button
              className="bg-blue-600 text-white hover:bg-white hover:text-black"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
