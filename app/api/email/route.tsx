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
    const response = await resend.emails.send({
      from: process.env.SENDER_EMAIL || '',
      to: process.env.CLIENT_EMAIL || '',
      subject: `SBA-cliente: ${name} Servicio: ${serviceCategory}`,
      text: 'hola',
    });

    // Imprimir la respuesta de la API para obtener más detalles
    console.log('Correo enviado con éxito:', response);

    return NextResponse.json({ status: 200, response });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    return NextResponse.json({ status: 500, error: error });
  }
}
