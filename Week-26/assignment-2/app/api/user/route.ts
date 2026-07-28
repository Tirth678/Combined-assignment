import { NextRequest, NextResponse } from 'next/server';

export async function GET(){
    return NextResponse.json({ message: 'Hello World' }, {status: 200})
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const user = new prisma.user.create({
        data:{
            
        }
    })

    return NextResponse.json({ username: body.username, password: body.password }, {status: 200})
}