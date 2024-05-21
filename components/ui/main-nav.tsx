"use client";
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Search } from "./search"
import React from "react";

interface linkProps extends React.HTMLAttributes<HTMLElement> {
  link: number
}

const SECRET_TOKEN = process.env.NEXT_PUBLIC_SECRET;

export function MainNav({
  className,
  link,
  ...props
}: linkProps) {
  const [randomTitle, setRandomTitle] = React.useState("");

  const fetchPost = async () => {
    const json = await (await fetch(`/api/admin/random`)).json();
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
      <Link
        href="https://docs.google.com/forms/d/e/1FAIpQLScRTXS-RjPKrmaRzovhiaOdBCZ-ONPUFyH_HBi0y3yLDWEtEg/viewform?usp=sf_link"
        className={`text-sm font-medium ${link !== 3 ? "text-muted-foreground" : ""} transition-colors hover:text-primary`}
      >
        Feedback form
      </Link>
      <Search />

    </nav>
  )
}