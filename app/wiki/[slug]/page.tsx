"use client";
import { Header } from "@/components/ui/header";
import { Loading } from "@/components/ui/loading";
import { MainNav } from "@/components/ui/main-nav";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import Markdown from 'markdown-to-jsx'
import MarkdownRenderer from "@/components/ui/renderer";
import { useRouter } from 'next/navigation'
import { TypographyH1 } from "@/components/ui/TypographyComponents";

const SECRET_TOKEN = process.env.NEXT_PUBLIC_SECRET;

export default function Home({ params }: { params: { slug: string } }) {
    const [data, setData] = React.useState({
        title: "",
        body: "",
        visits: 0,
        createdAt: "",
        updatedAt: ""
    });

    const [loading, setLoading] = React.useState(true); // Add loading state
    const router = useRouter();

    const fetchPost = async () => {
        setLoading(true); // Set loading to true when fetching starts
        const response = await fetch(`/api/admin/wiki`, {
            method: "POST",
            //@ts-ignore
            body: JSON.stringify({
                page: params.slug
            })
        });
        
        const json = await response.json();
        if (json.message){
            router.push("/404");
            return;
        }
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
        <>
            <Header link={-1} />
            {loading ? (
                <Loading /> // Show loading component while loading is true
            ) : (
                <div className="mx-12 mt-10 body">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                        <TypographyH1>
                                {data.title.replace(/_/g, " ")}
                        </TypographyH1>
                        </div>
                    </div>
                    <Separator className="my-4" />
                    <p>
                        <MarkdownRenderer data={{ body: data.body }} />
                    </p>
                </div>
            )}
        </>
    );
}
