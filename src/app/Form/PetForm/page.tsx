"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


// **Schema Validation using Zod**
const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  type: z.string().min(1, { message: "Type is required." }),
  breed: z.string().min(1, { message: "Breed is required." }),

  age: z.preprocess(
    (val) => Number(val), // Preprocess to convert string to number
    z.number().min(1, { message: "Age must be greater than 0" }) // Apply number validation
  ),
  image_url: z.string().optional(),
  public_id: z.string().optional(),
});

type FormData = z.infer<typeof FormSchema>;

export default function PetForm() {
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      type: "",
      breed: "",
      age: 1, // Default value as number
    },
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  // **Form Submission Handler**
  const onSubmitHandler = async (data: FormData) => {
    try {
      if (!image) {
        return;
      }

      const formData = new FormData();

      // Append all form fields to the FormData object
      formData.append("name", data.name);
      formData.append("type", data.type);
      formData.append("breed", data.breed);
      formData.append("age", data.age.toString()); // Convert age to string
      formData.append("image", image); // Append the image

      const response = await axios.post("/api/users/petform", formData);

      if(response)
      {
        router.push("/gallery")
      }

      const result = await response.data;
      console.log(result);
    } catch (error: any) {
      console.log("Error", error.message);
    }
  };

  return (
    <main className="bg-gray-900 min-h-screen">
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-[450px] mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <CardHeader className="text-gray-400 font-bold">
            <CardTitle>Add Pet</CardTitle>
            <CardDescription className="text-gray-400 font-bold">
              Add your pet to the parade
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitHandler)}
                className="w-full space-y-6"
              >
                <div className="grid w-full items-center gap-4">
                  {/* **Name Field** */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <div className="flex flex-col space-y-1.5">
                        <Label
                          htmlFor="name"
                          className="text-gray-400 font-bold"
                        >
                          Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="Name of your pet"
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    )}
                  />
                  {/* **Type Field** */}
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <div className="flex flex-col space-y-1.5">
                        <Label
                          htmlFor="type"
                          className="text-gray-400 font-bold"
                        >
                          Type
                        </Label>
                        <Input
                          id="type"
                          placeholder="Type of your pet"
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    )}
                  />
                  {/* **Breed Field** */}
                  <FormField
                    control={form.control}
                    name="breed"
                    render={({ field }) => (
                      <div className="flex flex-col space-y-1.5">
                        <Label
                          htmlFor="breed"
                          className="text-gray-400 font-bold"
                        >
                          Breed
                        </Label>
                        <Input
                          id="breed"
                          placeholder="Breed of your pet"
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    )}
                  />
                  {/* **Age Field** */}
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="age" className="text-gray-400 font-bold">
                          Age
                        </Label>
                        <Input
                          id="age"
                          type="number"
                          placeholder="Age of your pet"
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    )}
                  />
                  {/* **Image Upload Section** */}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="image" className="text-gray-400 font-bold">
                      Upload Image
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>
                <CardFooter className="flex justify-center">
                  <Button type="submit" className="w-32 bg-white text-black">
                    Submit
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
