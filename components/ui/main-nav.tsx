"use client";
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Search } from "./search"
import React from "react";

interface linkProps extends React.HTMLAttributes<HTMLElement> {
  link: number
}

export function MainNav({
  className,
  link,
  ...props
}: linkProps) {
  const [randomTitle, setRandomTitle] = React.useState("");

  const fetchPost = async () => {
    const json = await (await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/random`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })).json();
    setRandomTitle(json.title);
  }

  React.useEffect(() => {
    fetchPost();
  }, [])
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/new"
        className={`text-sm font-medium ${link !== 0 ? "text-muted-foreground" : ""} transition-colors hover:text-primary`}
      >
        Create a new page
      </Link>
      <Link
        href={`/wiki/${randomTitle}`}
        className={`text-sm font-medium ${link !== 1 ? "text-muted-foreground" : ""} transition-colors hover:text-primary`}
      >
        Random page
      </Link>
      <Link
        href={`/allPages`}
        className={`text-sm font-medium ${link !== 2 ? "text-muted-foreground" : ""} transition-colors hover:text-primary`}
      >
        All pages
      </Link>
      <Search />

    </nav>
  )
}