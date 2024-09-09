import { connect } from "@/lib/dbconfig/dbconfig";
import { Pet } from "@/lib/userModel";
import { NextRequest, NextResponse } from "next/server";


connect()
export const GET = async (req: NextRequest) => {
  {
    try {
      const pets = await Pet.find();
      console.log(pets);
      return NextResponse.json({ pets }, { status: 200 });
    } catch (error: any) {
      console.error("Error fetching pets", error);
      return NextResponse.json(
        {
          error: "Faliled Fetching pets",
        },
        {
          status: 500,
        }
      );
    }
  }
};
