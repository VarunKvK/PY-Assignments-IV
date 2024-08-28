"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [placeInfo, setPlaceInfo] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/cafe", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        setPlaceInfo(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col h-full p-6 w-full relative">
      <div className="flex items-center justify-between text-black w-full">
        <div className="flex flex-col gap-.5">
          <h1 className="font-semibold text-4xl">Lookout</h1>
          <p className="font-regular text-md opacity-50">availabe wifi spots</p>
        </div>
        <div className="">
          <Link href={"/new"}>New Coffee Place?Add them</Link>
        </div>
      </div>
      <div className="text-white h-[40vh] mt-8">
        <div className="">
          <p className="font-regular text-md opacity-50">
            The nearby hotspots.
          </p>
          <div className="grid h-full gap-2 mt-4">
            {placeInfo.map((p, index) => (
              <CardDetails p={p} key={index}/>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Power, PowerOff, Wifi, WifiOff } from "lucide-react";

const CardDetails = ({ p }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-4xl font-semibold">{p.name}</CardTitle>
        <CardDescription>{p.location}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-2">
        {p.wifi ? (
          <p className="">
            <Wifi />
          </p>
        ) : (
          <p className="">
            <WifiOff />
          </p>
        )}
        {p.power ? (
          <p className="">
            <Power />
          </p>
        ) : (
          <p className="">
            <PowerOff />
          </p>
        )}
      </CardContent>
      <CardFooter>
        <div className=" w-full h-full">
          <Image
            src={p.image}
            width={300}
            height={300}
            className="rounded-lg relative object-cover w-full h-full"
          />
        </div>
      </CardFooter>
    </Card>
  );
};
