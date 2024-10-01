
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
   
           
        const SubmitedText=await TextSubmission.create({
                   text:submittedText
           })
          
           if(!SubmitedText){

             return NextResponse.json({ message: "Error while creating message"}, { status: 200 });
           }
         
         return NextResponse.json({ message: "Text submitted successfully!",submittedText}, { status: 200 });
     } 
     
     } catch (error) {

       return NextResponse.json({ message: "No text provided." ,error}, { status: 400 });
    
   }
}
