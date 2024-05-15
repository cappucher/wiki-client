"use client";
import { Header } from "@/components/ui/header";
import { MainNav } from "@/components/ui/main-nav";
import { Separator } from "@/components/ui/separator";
import { UserNav } from "@/components/ui/user-nav";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Page } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [titles, setTitles] = React.useState<Page[]>([]);
  const [loading, setLoading] = React.useState(true); // Add loading state

  const fetchPost = async () => {
    setLoading(true);
    const json = await (await fetch(`${process.env.BACKEND_URL}/`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })).json();
    setTitles(json);
    setLoading(false); 

  }

  React.useEffect(() => {
    fetchPost();
  }, [])
  return (
    <main className="">
      <Header link={-1}/>
      <div className="mx-12 mt-10">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">
              Visit our 10 most popular pages! Or make some.
            </h1>
          </div>
        </div>
        <Separator className="my-4" />
        {loading ? (
          <Skeleton className="h-[400px] w-[800px] rounded-xl" />
        ) : (
          <p>
            {titles.map((obj) => {
              return <>
                <Link className="text-blue-600 hover:text-blue-800 active:text-purple-700 underline" href={`http://localhost:3000/wiki/${obj.title}`}>{obj.title?.replace(/_/g, " ")}</Link><br></br>
              </>
            })}
          </p>)}
      </div>
    </main>
  );
}
