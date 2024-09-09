import { connect } from "@/lib/dbconfig/dbconfig";
import { uploadImage } from "@/lib/uploadImage/uploadimage";
import { Pet } from "@/lib/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const type = formData.get("type") as string;
    const breed = formData.get("breed") as string;
    const ageString = formData.get("age") as string; // Parse age as an integer
    const image = formData.get("image") as unknown as File;

    const age = parseInt(ageString, 10);

    if (!name || !type || !breed || !age || !image) {
      return NextResponse.json(
        {
          msg: "All fields are required",
        },
        { status: 400 }
      );
    }

    const data: any = await uploadImage(image, "nextjs-imagegallery");

    const newPet = new Pet({
      name,
      type,
      breed,
      age, // Ensure age is stored as a number
      image_url: data?.secure_url,
      public_id: data?.public_id,
    });

    const savedPet = await newPet.save();
    console.log(savedPet);

    return NextResponse.json(
      { msg: data },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json({ msg: "Error adding pet", error: error.message }, { status: 500 });
  }
};
