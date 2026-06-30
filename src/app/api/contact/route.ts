import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with a placeholder or environment variable
const resend = new Resend(process.env.RESEND_API_KEY || 're_PLACEHOLDER');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: 'Dandia Tech Contact <onboarding@resend.dev>',
      to: 'hello@dandiaholdings.com', // Replace with the actual recipient
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}
