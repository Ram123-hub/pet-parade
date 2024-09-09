import { connect } from "@/lib/dbconfig/dbconfig";
import { uploadImage } from "@/lib/uploadImage/uploadimage";
import { Petofthemonths } from "@/lib/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const species = formData.get("species") as string;
    const story = formData.get("story") as string;
    const achievements = formData.get("achievements") as string;
    const image = formData.get("image") as unknown as File;

    console.log({ name, species, story, achievements, image });

    if (!name || !species || !story || !achievements || !image) {
      return NextResponse.json(
        { msg: "All fields are required" },
        { status: 400 }
      );
    }

    const achievementsArray: string[] = JSON.parse(achievements as string);

    const data: any = await uploadImage(image, "petofthemonthimage");

    const existingEntry = await Petofthemonths.findOne();
    if (existingEntry) {
      existingEntry.name = name;
      existingEntry.species = species;
      existingEntry.story = story;
      existingEntry.achievements = achievementsArray;
      existingEntry.image_url = data?.secure_url;
      existingEntry.public_id = data?.public_id;

      await existingEntry.save();
    } else {
      const newPetofthemonth = new Petofthemonths({
        name,
        species,
        story,
        achievements: achievementsArray,
        image_url: data?.secure_url,
        public_id: data?.public_id,
      });

      console.log(newPetofthemonth);

      await newPetofthemonth.save();
    }

    return NextResponse.json(
      { msg: "Pet of the Month created successfully!" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Failed to create Pet of the Month:", error.message);
    return NextResponse.json(
      { msg: "Failed to create Pet of the month", error: error.message },
      { status: 500 }
    );
  }
};
