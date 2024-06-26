import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/db/dbConnect";
import User from "@/models/user.model";
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/utils/mailer";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email});

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

      // send verification mail
      await sendEmail({email, emailType: 'VERIFY', userId: savedUser._id});

      return NextResponse.json({
        message: "User created successfully",
        success: true,
        savedUser
      })
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
        
    }
}