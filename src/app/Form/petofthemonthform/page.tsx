"use client";

import React, { ChangeEvent, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";


// **Schema Validation using Zod**
const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  species: z.string().min(1, { message: "Species is required." }),
  story: z.string().min(1, { message: "Story is required." }),
  achievements: z.string().min(2, {
    message: "Achievements must be at least 2 characters.",
  }),
  image_url: z.string().optional(),
  public_id: z.string().optional(),
});

type FormData = z.infer<typeof FormSchema>;

export default function Petofthemonthform() {
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      species: "",
      story: "",
      achievements: "",
    },
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmitHandler: SubmitHandler<FormData> = async (data) => {
    setError(null); // Reset error state

    try {
      if (!image) {
        setError("Image is required.");
        return;
      }

      const formData = new FormData();

      // Append all form fields to the FormData object
      formData.append("name", data.name);
      formData.append("species", data.species);
      formData.append("story", data.story);
      formData.append("image", image);

      const achievementsArray = data.achievements.split(",").map((ach) => ach.trim())

      formData.append("achievements", JSON.stringify(achievementsArray))

      const response = await axios.post("/api/users/petofthemonth", formData);
      if (response) {
        router.push('/petofthemonth')
      }

      const result = response.data;
      console.log(result);
    } catch (error: any) {
      console.error("Error submitting form:", error.message);
      setError("An error occurred while submitting the form.");
    }
  };

  return (
    <main className="bg-gray-900 min-h-screen">
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-[750px] bg-gray-800 mx-auto p-6 rounded-lg shadow-lg">
          <CardHeader className="text-gray-400 font-bold">
            <CardTitle>Pet of the Month</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitHandler)}
                className="w-full space-y-6"
              >
                <div className="grid w-full items-center gap-4">
                  {/* Name Field */}
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
                          placeholder="Fluffy"
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    )}
                  />
                  {/* Species Field */}
                  <FormField
                    control={form.control}
                    name="species"
                    render={({ field }) => (
                      <div className="flex flex-col space-y-1.5">
                        <Label
                          htmlFor="species"
                          className="text-gray-400 font-bold"
                        >
                          Species
                        </Label>
                        <Input
                          id="species"
                          placeholder="Cat / Dog / Bird"
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    )}
                  />
                  {/* Story Field */}
                  <FormField
                    control={form.control}
                    name="story"
                    render={({ field }) => (
                      <div className="flex flex-col space-y-1.5">
                        <Label
                          htmlFor="story"
                          className="text-gray-400 font-bold"
                        >
                          Story
                        </Label>
                        <Textarea
                          id="story"
                          placeholder="Fluffy was rescued from a shelter..."
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    )}
                  />
                  {/* Achievements Field */}
                  <FormField
                    control={form.control}
                    name="achievements"
                    render={({ field }) => (
                      <div className="flex flex-col space-y-1.5">
                        <Label
                          htmlFor="achievements"
                          className="text-gray-400 font-bold"
                        >
                          Achievements
                        </Label>
                        <Input
                          id="achievements"
                          placeholder="Best Napper , Cuddliest Cat"
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    )}
                  />
                  {/* Image Upload Section */}
                  <div className="flex flex-col space-y-1.5">
                    <Label
                      htmlFor="image"
                      className="text-gray-400 font-bold"
                    >
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
