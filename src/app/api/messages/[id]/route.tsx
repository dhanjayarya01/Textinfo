// app/api/messages/[id]/route.ts

import TextSubmission from '@/app/models/Textinfo_model';
import ConnectDB from '@/app/ConnectDB';
import { NextResponse } from 'next/server';

ConnectDB();

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    console.log("jlkfldkgjldfjgjklgdjlkgjl")
    const { id } = params;
  
    const deletedMessage = await TextSubmission.findByIdAndDelete(id);

    if (!deletedMessage) {
      return NextResponse.json({ message: 'Message not found.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Message deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ message: 'Error deleting message' }, { status: 500 });
  }
}
