import { getDataFromToken } from "@/utils/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/dbConnect";
import User from "@/models/user.model";

connectDB();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            message: "User found",
            data: user,
            status: 200
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
