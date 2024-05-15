"use client";
import { Header } from "@/components/ui/header";
import { MainNav } from "@/components/ui/main-nav";
import { Separator } from "@/components/ui/separator";
import { UserNav } from "@/components/ui/user-nav";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Page } from "@/lib/types";
import { Loading } from "@/components/ui/loading";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home({ params }: { params: { slug: string } }) {
  const [titles, setTitles] = React.useState<Page[]>([]);
  const [loading, setLoading] = React.useState(true); // Add loading state


  const fetchPost = async () => {
    setLoading(true);
    const res = await (await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/search`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        title: params.slug
      })
    })).json();
    setTitles(res);
    setLoading(false);
  }

  React.useEffect(() => {
    fetchPost();
  }, [])
  return (
    <main className="">
      <Header link={-1} />
      <div className="mx-12 mt-10">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">
              Search results for the query "{params.slug.replace(/_/g, " ")}".
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
                <Link className="text-blue-600 hover:text-blue-800 active:text-purple-700 underline" href={`https://wiki-client.vercel.app/wiki/${obj.title}`}>{obj.title?.replace(/_/g, " ")}</Link><br></br>
              </>
            })}
          </p>)}
      </div>
    </main>
  );
}
