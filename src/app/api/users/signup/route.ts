import { UserModel } from "@/lib/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/lib/dbconfig/dbconfig";

connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { username, emailId, password } = reqBody;

    // Validate the emailId
    if (!emailId || typeof emailId !== "string" || emailId.trim() === "") {
      return NextResponse.json(
        {
          error: "A valid email is required",
        },
        {
          status: 400,
        }
      );
    }

    // Check if the user already exists
    const user = await UserModel.findOne({ emailId });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password before saving
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create and save the new user
    const newUser = new UserModel({
      username,
      emailId,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};