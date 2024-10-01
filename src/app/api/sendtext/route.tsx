
import { NextRequest, NextResponse } from "next/server";

import TextSubmission from "@/app/models/Textinfo_model";
import ConnectDB from "@/app/ConnectDB";

ConnectDB()

export async function POST(request: NextRequest) {
   try {
     const url = new URL(request.url);
     const queryText = url.searchParams.get("text"); 
 
     console.log("checking the urll fjsjfll",queryText)
     
     let bodyText;
    if(!queryText){
 
        const body = await request.json(); 
         bodyText = body.text; 
    }
 
     
     const submittedText = queryText || bodyText;
 
     if (submittedText) {
   
         console.log("Submitted Text:", submittedText);
           
        const SubmitedText=await TextSubmission.create({
                   text:submittedText
           })
          
         
         return NextResponse.json({ message: "Text submitted successfully!",submittedText}, { status: 200 });
     } 
     
     } catch (error) {

       return NextResponse.json({ message: "No text provided." }, { status: 400 });
    
   }
}
