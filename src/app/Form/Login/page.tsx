"use client";
import React, { useState } from "react";
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
import toast from 'react-hot-toast'

// **Schema Validation using Zod**
const FormSchema = z.object({
    emailId: z.string().email({ message: "Enter a valid email." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

type FormData = z.infer<typeof FormSchema>;

export default function LoginForm() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const form = useForm<FormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            emailId: '',
            password: '',
        },
    });

    const onSubmitHandler: SubmitHandler<FormData> = async (data) => {
        setError(null);
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', data);
            console.log('Login Success', response.data)
            toast.success('Login Successful!')
            if (response) {
                router.push('/');
            }

        } catch (error: any) {
            console.error("Error submitting form:", error.message);
            setError(error.response?.data?.message || "An error occurred while submitting the form.");
            toast.error('Login failed. Please try again')
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="bg-gray-900 min-h-screen">
            <div className="flex justify-center items-center min-h-screen">
                <Card className="w-[550px] bg-gray-800 mx-auto p-6 rounded-lg shadow-lg">
                    <CardHeader className="text-gray-400 font-bold">
                        <CardTitle>Login</CardTitle>
                        <h1 className="flex justify-center mt-2">{loading ? "Processing..." : "Login"}</h1>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmitHandler)}
                                className="w-full space-y-6"
                            >
                                <div className="grid w-full items-center gap-4">
                                    {/* EmailId Field */}
                                    <FormField
                                        control={form.control}
                                        name="emailId"
                                        render={({ field, fieldState }) => (
                                            <div className="flex flex-col space-y-1.5">
                                                <Label
                                                    htmlFor="emailId"
                                                    className="text-gray-400 font-bold"
                                                >
                                                    Email
                                                </Label>
                                                <Input
                                                    id="emailId"
                                                    placeholder="user@gmail.com"
                                                    {...field}
                                                />
                                                {fieldState.error && (
                                                    <FormMessage>{fieldState.error.message}</FormMessage>
                                                )}
                                            </div>
                                        )}
                                    />
                                    {/* Password Field */}
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field, fieldState }) => (
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
                                                {fieldState.error && (
                                                    <FormMessage>{fieldState.error.message}</FormMessage>
                                                )}
                                            </div>
                                        )}
                                    />
                                </div>
                                <CardFooter className="flex justify-center">
                                    <Button
                                        type="submit"
                                        className="w-32 bg-white text-black hover:bg-gray-200 hover:text-blue-500"
                                        disabled={loading || !form.formState.isValid}
                                    >
                                        {loading ? 'Loading...' : 'Login'}
                                    </Button>

                                </CardFooter>
                                <div className="grid justify-center">
                                    <p className="text-white font-bold">If you are not signed up, please signup</p>
                                    <Link href='/Form/Signup' className="flex justify-center text-white font-bold border-b border-b-green-50 hover:border-white hover:text-black">
                                        Visit Signup page
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
