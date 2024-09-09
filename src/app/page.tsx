"use client";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex flex-col lg:flex-row justify-between items-center px-4 lg:px-20 py-8">
        <div className="max-w-2xl">
          <h1 className="text-violet-400 text-4xl font-semibold mb-4">Welcome to Pet Parade! 🐾🎉</h1>
          <div className="text-violet-200 font-light text-base space-y-4">
            <p>
              At Pet Parade, we celebrate the wonderful world of pets and the joy they bring into our lives. Whether you’re a proud pet owner, an animal enthusiast, or someone looking to bring a new furry friend into your home, you’ll find a warm and welcoming community here.
            </p>
            <p>
              Our platform is dedicated to connecting pet lovers from all walks of life, sharing heartwarming stories, expert advice, and the latest trends in pet care. From playful puppies to curious kittens, from exotic birds to adorable bunnies, every pet has a story, and every story adds to the parade of joy that pets bring into our world.
            </p>
            <p>
              Join us as we explore the delightful adventures of our animal companions, celebrate their unique personalities, and create lasting memories. Welcome to Pet Parade – where every pet is a star! 🌟🐶🐱🐹🐰🦜
            </p>
          </div>
        </div>
        <div className="mt-8 lg:mt-0 lg:ml-12">
          <Image
            src="/catordog.jpg" // Replace with the path to your image
            alt="Pet Parade"
            width={400} // Adjust the width as needed
            height={200} // Adjust the height as needed
            className="border rounded-sm bg-gray-900"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}
