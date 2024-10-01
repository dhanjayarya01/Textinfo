import { NextRequest, NextResponse } from 'next/server';
import TextSubmission from '@/app/models/Textinfo_model';
import ConnectDB from '@/app/ConnectDB';

ConnectDB();

export async function GET() {
    try {
        const messages = await TextSubmission.find(); 
        return NextResponse.json(messages, { status: 200 });
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json({ message: 'Error fetching messages' }, { status: 500 });
    }
}
