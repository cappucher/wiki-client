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

export default function NotFound() {
    return (
        <main className="">
            <Header link={-1} />
            <div className="mx-12 mt-10">
                <div className="flex items-center justify-center">
                    <div className="space-y-1 flex flex-col items-center justify-center">
                        <h1 className="text-8xl font-semibold tracking-tight">
                            404 Error!
                        </h1>
                        <p className="text-center">
                            Let's get you back on <Link className="text-blue-600 hover:text-blue-800 active:text-purple-700 underline" href="/">track</Link>.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
