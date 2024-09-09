"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Button } from '@/components/ui/button';

interface Pet {
  _id: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  image_url: string;
}

export default function Gallery() {
  const [pets, setPets] = useState<Pet[]>([]);

  const fetchAllPets = async () => {
    try {
      const { data } = await axios.get("/api/users/getpets");
      setPets(data.pets);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllPets();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/users/deletePet/${id}`);
      setPets(pets.filter(pet => pet._id !== id));
    } catch (error: any) {
      console.error('Error deleting pet', error.message);
    }
  }

  return (
    <div className='bg-gray-900 min-h-screen p-8'>
      <div className="max-w-[1200px] mx-auto">
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {pets.map((pet) => (
            <div key={pet._id} className='bg-gray-800 rounded-xl p-4'>
              <div className='relative h-64 w-full mb-4'>
                {pet.image_url ? (
                  <Image
                    src={pet.image_url}
                    alt={pet.name}
                    fill={true}
                    className='object-cover rounded-lg'
                    sizes='(max-width: 768px) 100vw, 33vw'
                  />
                ) : (
                  <div className='bg-gray-600 h-full w-full flex items-center justify-center rounded-lg text-white'>
                    No Image Available
                  </div>
                )}
              </div>
              <h2 className='text-white text-xl font-bold'>{pet.name}</h2>
              <p className='text-gray-400'>Type: {pet.type}</p>
              <p className='text-gray-400'>Breed: {pet.breed}</p>
              <p className='text-gray-400'>Age: {pet.age}</p>
              <Button
                  onClick={() => handleDelete(pet._id)}
                  className="mt-4 px-4 py-2 bg-gray-900 text-white rounded hover:bg-red-600 ml-3"
                >
                Delete Pet
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
