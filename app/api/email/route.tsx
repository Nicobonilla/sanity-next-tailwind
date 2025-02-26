import { Resend } from 'resend';
import { type NextRequest, NextResponse } from 'next/server';
import { render } from '@react-email/render';
import Email from '@/components/global/Email';

type Article = {
  name: string;
  rut: string;
  phone: string;
  comuna: string;
  email: string;
  mainCategory: string;
  serviceCategory: string;
  message: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const {
    name,
    rut,
    phone,
    comuna,
    email,
    mainCategory,
    serviceCategory,
    message,
  }: Article = await request.json();

  const emailHtml = render(
    <Email
      name={name}
      rut={rut}
      phone={phone}
      comuna={comuna}
      email={email}
      mainCategory={mainCategory}
      serviceCategory={serviceCategory}
      message={message}
    />
  );

  try {
    await resend.emails.send({
      from: process.env.SENDER_EMAIL || '',
      to: process.env.CLIENT_EMAIL || '',
      subject: `SBA-cliente: ${name} Servicio: ${serviceCategory}`,
      text: 'hola',
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500 });
  }
}
