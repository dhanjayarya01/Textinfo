import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email } = await req.json(); 
    console.log("Received email for admin login:", email);
    
    if (email === process.env.AEMAIL) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" }); 

      const response = NextResponse.json({ message: "Login successful." }, { status: 200 });

      response.cookies.set("admin-auth-token", token, {
        path: "/",
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        maxAge: 60 * 60, 
      });

      return response;
    } else {
      return NextResponse.json({ message: "Invalid email." }, { status: 401 });
    }
  } catch (error) {
    console.error("Error in POST /api/admin:", error);
    return NextResponse.json({ message: "An error occurred." }, { status: 500 });
  }
}
