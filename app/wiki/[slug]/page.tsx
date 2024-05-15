"use client";
import { Header } from "@/components/ui/header";
import { Loading } from "@/components/ui/loading";
import { MainNav } from "@/components/ui/main-nav";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import Markdown from 'react-markdown';

export default function Home({ params }: { params: { slug: string } }) {
    const [data, setData] = React.useState({
        title: "",
        body: "",
        visits: 0,
        createdAt: "",
        updatedAt: ""
    });

    const [loading, setLoading] = React.useState(true); // Add loading state

    const fetchPost = async () => {
        setLoading(true); // Set loading to true when fetching starts
        const response = await fetch(`http://localhost:3030/wiki/${params.slug}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const json = await response.json();
        setData({
            title: json.title,
            body: json.body,
            visits: Math.floor(json.visits / 2),
            createdAt: json.createdAt,
            updatedAt: json.updatedAt
        });
        setLoading(false); // Set loading to false when fetching ends
    };

    React.useEffect(() => {
        fetchPost();
    }, [params.slug]);

    return (
        <main>
            <Header link={-1} />
            {loading ? (
                <Loading /> // Show loading component while loading is true
            ) : (
                <div className="mx-12 mt-10">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h1 className="text-4xl font-semibold tracking-tight">
                                {data.title.replace(/_/g, " ")}
                            </h1>
                        </div>
                    </div>
                    <Separator className="my-4" />
                    <p>
                        {data.body}
                    </p>
                </div>
            )}
        </main>
    );
}
