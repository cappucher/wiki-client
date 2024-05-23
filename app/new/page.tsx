"use client";
import { Header } from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import Link from "next/link";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import React from "react";
import axios from "axios";

const formSchema = z.object({
    title: z.string().min(1).max(30),
    body: z.string().min(30)
})

export default function Home() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            body: ""
        },
    });
    const [submitted, setSubmitted] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [profane, setProfane] = React.useState(false);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await fetch('/api/admin/new', {
            method: "POST",
            body: JSON.stringify(values)
        })
        const responseJson = await response.json();
        if (response.status === 400 || response.status === 409)
        {
            setMessage(responseJson.message);
            setProfane(true);
        } else {
            setProfane(false);
        }
        setTitle(values.title.replace(/ /g, "_"));
        setSubmitted(true);
    }
    return (
        <main className="">
            <Header link={0} />
            <div className="mx-12 mt-10">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-semibold tracking-tight">
                            Create a new page
                        </h1>
                    </div>
                </div>
                <Separator className="my-4" />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Insert title here..." {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is where you must describe the nature of your <u>MEAT</u>. The maximum length for the title is 30 characters.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="body"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Body</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Insert title here..." {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This will be the <u>MEAT</u> of the page. The minimum length for the body is 30 characters. <br></br>To create headers, use the syntax <code>## HeaderName</code>. For links, use the syntax <code>[Name of link](URL of link)</code>.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Create new page</Button>
                    </form>
                </Form>
                <div className={!submitted ? "invisible" : ""}>
                    <p
                        className={`${profane ? "invisible" : ""} text-muted-foreground mt-2`}
                    >
                        Your page has sucessfully been created. It can be found at <Link className="text-blue-600 hover:text-blue-800 active:text-purple-700 underline" href={`/wiki/${title}`}>{`https://wiki-client.vercel.app/wiki/${title}`}</Link>.
                    </p>
                    <p 
                        className = {`text-destructive ${!profane ? "invisible" : ""}`}
                    >
                        {message}
                    </p>
                </div>
            </div>
        </main>
    );
}
