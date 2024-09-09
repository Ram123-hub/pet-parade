"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";

// **Schema Validation using Zod**
const FormSchema = z.object({
    username: z.string().min(3, { message: "Username is required." }),
    emailId: z.string().email({ message: "Enter a valid email." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

type FormData = z.infer<typeof FormSchema>;

export default function SignupForm() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<FormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: '',
            emailId: '',
            password: '',
        },
    });

    const onSubmitHandler: SubmitHandler<FormData> = async (data) => {
        setError(null);
        setLoading(true);
        try {
            const response = await axios.post('/api/users/signup', data);
            if (response.status === 200) {
                router.push('/');
            }
        } catch (error: any) {
            console.error("Error submitting form:", error);
            setError(
                error.response?.data?.error ||
                "An error occurred while submitting the form."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const subscription = form.watch((value) => {
            form.trigger(); // Trigger validation on each field change
        });
        return () => subscription.unsubscribe();
    }, [form]);

    return (
        <main className="bg-gray-900 min-h-screen">
            <div className="flex justify-center items-center min-h-screen">
                <Card className="w-[550px] bg-gray-800 mx-auto p-6 rounded-lg shadow-lg">
                    <CardHeader className="text-gray-400 font-bold">
                        <CardTitle>Pet of the Month</CardTitle>
                        <h1 className="flex justify-center mt-2">{loading ? "Processing..." : "Signup"}</h1>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmitHandler)}
                                className="w-full space-y-6"
                            >
                                <div className="grid w-full items-center gap-4">
                                    {/* Username Field */}
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <div className="flex flex-col space-y-1.5">
                                                <Label
                                                    htmlFor="username"
                                                    className="text-gray-400 font-bold"
                                                >
                                                    Username
                                                </Label>
                                                <Input
                                                    id="username"
                                                    placeholder="username"
                                                    {...field}
                                                />
                                                <FormMessage />
                                            </div>
                                        )}
                                    />
                                    {/* EmailId Field */}
                                    <FormField
                                        control={form.control}
                                        name="emailId"
                                        render={({ field }) => (
                                            <div className="flex flex-col space-y-1.5">
                                                <Label
                                                    htmlFor="emailId"
                                                    className="text-gray-400 font-bold"
                                                >
                                                    EmailId
                                                </Label>
                                                <Input
                                                    id="emailId"
                                                    placeholder="user@gmail.com"
                                                    {...field}
                                                />
                                                <FormMessage />
                                            </div>
                                        )}
                                    />
                                    {/* Password Field */}
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <div className="flex flex-col space-y-1.5">
                                                <Label
                                                    htmlFor="password"
                                                    className="text-gray-400 font-bold"
                                                >
                                                    Password
                                                </Label>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    placeholder="password"
                                                    {...field}
                                                />
                                                <FormMessage />
                                            </div>
                                        )}
                                    />
                                </div>
                                <CardFooter className="flex justify-center">
                                    <Button
                                        type="submit"
                                        className="w-32 bg-white text-black hover:text-white"
                                        disabled={loading || !form.formState.isValid}
                                    >
                                        {loading ? 'Loading...' : 'Signup'}
                                    </Button>
                                </CardFooter>
                                <div className="grid justify-center">
                                    <p className="text-white font-bold">If you are already signed up, please login</p>
                                    <Link href='/Form/Login' className="flex justify-center text-white font-bold border-b border-bg-white hover:text-black">
                                        Visit Login page
                                    </Link>
                                </div>
                                {error && (
                                    <div className="text-red-500 text-center mt-4">
                                        {error}
                                    </div>
                                )}
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
