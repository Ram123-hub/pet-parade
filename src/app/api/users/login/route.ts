import { UserModel } from "@/lib/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { emailId, password } = reqBody;
    console.log(reqBody);

    const user = await UserModel.findOne({ emailId });
    if (!user) {
      return NextResponse.json(
        {
          error: "User does not exist",
        },
        {
          status: 400,
        }
      );
    }

    const validatePassword = await bcryptjs.compare(password, user.password);
    if (!validatePassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }
    const tokenData = {
      id: user._id,
      username: user.username,
      emailId: user.emailId,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '1d',
    });

    console.log(token)

    const response = NextResponse.json({
      message: "Login Successfully",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
