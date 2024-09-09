'use client'

import * as React from "react"
import { useState , useEffect } from "react";


import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import axios from "axios"
import Image from "next/image";


interface PetOfTheMonth {
    name: string;
    species: string;
    story: string;
    achievements: string | string[];
    image_url: string;
}
export default function Petofthemonth() {

    const [petOfTheMonth, setPetOfTheMonth] = useState<PetOfTheMonth | null>(null);



    const fetchPetOfTheMonth = async () => {
        try {
            const { data } = await axios.get<{ petOfTheMonth: PetOfTheMonth }>("/api/users/getpetofthemonth");
            console.log(data); // Inspect the entire response
            setPetOfTheMonth(data.petOfTheMonth); // Set the petOfTheMonth state with the fetched data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.message);
            } else {
                console.log('An unexpected error occurred:', error);
            }
        }
    };

    useEffect(()=>{
        fetchPetOfTheMonth();
    },[])

    const formatAchievements = (achievements: string | string[]) => {
        if (Array.isArray(achievements)) {
            return achievements.join(", ");
        } else if (typeof achievements === "string") {
            return achievements.split(",").map((ach) => ach.trim()).join(", ");
        }
        return achievements;
    };

    return (
        <div className='bg-gray-900 min-h-screen p-8'>
            <div className="flex justify-center items-center">
                <Card className="w-[450px] bg-gray-800">
                    <CardHeader className="flex items-center text-white">
                        <CardTitle className="">Pet of the Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {petOfTheMonth ? (
                            <div className="space-y-4 ml-2">
                                <div className='relative h-96 w-96 mb-4 '>
                                    {petOfTheMonth.image_url ? (
                                        <Image
                                            src={petOfTheMonth.image_url}
                                            alt={petOfTheMonth.name}
                                            fill={true}
                                            objectFit="cover"
                                            className="rounded-lg"

                                        />
                                    ) : (
                                        <div className='bg-gray-600 h-full w-full flex items-center justify-center rounded-lg text-white'>
                                            No Image Available
                                        </div>
                                    )}
                                </div>
                                <h2 className='text-white text-2xl font-bold'>{petOfTheMonth.name}</h2>
                                <p className='text-gray-400'>Species: {petOfTheMonth.species}</p>
                                <p className='text-gray-400'>Story: {petOfTheMonth.story}</p>
                                <p className='text-gray-400'>
                                    Achievements: {formatAchievements(petOfTheMonth.achievements)}
                                </p>
                            </div>
                        ) : (
                            <p className='text-white'>Loading Pet of the Month...</p>
                        )}
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}
