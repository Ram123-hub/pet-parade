import { connect } from "@/lib/dbconfig/dbconfig";
import { getDataFromToken } from "@/lib/helpers/getDataFromToken";
import { UserModel } from "@/lib/userModel";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";  // Ensure this route is dynamic

connect();

export const GET = async (request: NextRequest) => {
  try {
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { error: "User ID could not be retrieved from token" },
        { status: 401 }
      );
    }

    const user = await UserModel.findOne({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'User found',
      data: user
    });
  } catch (error: any) {
    console.error("Error fetching user:", error.message); // Log the error for debugging
    return NextResponse.json(
      { error: error.message },
      { status: 500 } // Set a proper status code for server errors
    );
  }
};
