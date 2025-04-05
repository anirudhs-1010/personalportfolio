import { NextResponse } from 'next/server';

export async function POST(req, res) {
  const data = await req.json();
  const { name, email, subject, message } = data;

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('DISCORD_WEBHOOK_URL is not set in environment variables.');
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

  const discordMessage = {
    embeds: [
      {
        title: 'New Contact Form Submission',
        fields: [
          { name: 'Name', value: name },
          { name: 'Email', value: email },
          { name: 'Subject', value: subject },
          { name: 'Message', value: message },
        ],
      },
    ],
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordMessage),
    });

    if (response.ok) {
      return NextResponse.json({ message: 'Message sent to Discord successfully' }, { status: 200 });
    } else {
      console.error('Failed to send message to Discord:', response.status, response.statusText);
      return NextResponse.json({ error: 'Failed to send message to Discord' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error sending message to Discord:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}