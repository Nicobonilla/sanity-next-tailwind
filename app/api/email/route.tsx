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

let resend: Resend | undefined;

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('Missing RESEND_API_KEY');
  resend ??= new Resend(apiKey);
  return resend;
}

export async function POST(request: NextRequest) {
  try {
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
    const sender = process.env.SENDER_EMAIL;
    const recipient = process.env.CLIENT_EMAIL;
    if (!sender || !recipient) {
      throw new Error('Missing sender or recipient email configuration');
    }

    const emailHtml = await render(
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

    const response = await getResend().emails.send({
      from: sender,
      to: recipient,
      subject: `SBA-cliente: ${name} Servicio: ${mainCategory}`,
      html: emailHtml,
    });

    return NextResponse.json({ response });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
