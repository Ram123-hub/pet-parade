
import { connect } from "@/lib/dbconfig/dbconfig";
import { Petofthemonths } from "@/lib/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export const GET = async (req: NextRequest) => {
  try {
    // Fetch pet of the month data
    const petOfTheMonth = await Petofthemonths.find().limit(1); // Adjust limit if you need only one pet

    // Check if any pets are found
    if (petOfTheMonth.length === 0) {
      return NextResponse.json(
        { message: "No pet of the month found" },
        { status: 404 }
      );
    }

    // Log the fetched data for debugging
    console.log(petOfTheMonth);

    // Return the fetched pet of the month
    return NextResponse.json(
      { petOfTheMonth: petOfTheMonth[0] }, // Return the first item if you expect only one pet
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching pets", error);
    return NextResponse.json(
      { error: "Failed fetching pets" },
      { status: 500 }
    );
  }
};
