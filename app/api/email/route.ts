import React from 'react';

import { render } from '@react-email/render';
import { type NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

import Email from '@/components/global/Email';
import { leadFormRequestSchema } from '@/lib/lead-form';

const MIN_SUBMIT_TIME_MS = 1500;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const rateLimitStore = new Map<string, { count: number; expiresAt: number }>();

let resendClient: Resend | null = null;

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }

  return resendClient;
}

function getRateLimitKey(request: NextRequest, email: string) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor?.split(',')[0]?.trim() || 'unknown';

  return `${ip}:${email.toLowerCase()}`;
}

function isRateLimited(key: string) {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || record.expiresAt < now) {
    rateLimitStore.set(key, {
      count: 1,
      expiresAt: now + RATE_LIMIT_WINDOW_MS,
    });

    return false;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  rateLimitStore.set(key, {
    ...record,
    count: record.count + 1,
  });

  return false;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = leadFormRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: 'Datos de formulario invalidos' },
        { status: 400 }
      );
    }

    const {
      comuna,
      consultationFormat,
      email,
      mainCategory,
      message,
      name,
      phone,
      preferredDate,
      preferredTimeSlot,
      rut,
      serviceCategory,
      submittedAt,
      website,
    } = parsed.data;

    if (website) {
      return NextResponse.json({ status: 200, ok: true });
    }

    if (Date.now() - submittedAt < MIN_SUBMIT_TIME_MS) {
      return NextResponse.json(
        { message: 'Solicitud descartada por validacion anti-spam' },
        { status: 429 }
      );
    }

    if (isRateLimited(getRateLimitKey(request, email))) {
      return NextResponse.json(
        { message: 'Demasiadas solicitudes. Intenta nuevamente mas tarde.' },
        { status: 429 }
      );
    }

    const emailHtml = await render(
      React.createElement(Email, {
        comuna,
        consultationFormat,
        email,
        mainCategory,
        message: message || '',
        name,
        phone,
        preferredDate: preferredDate || '',
        preferredTimeSlot: preferredTimeSlot || '',
        rut,
        serviceCategory,
      })
    );

    const resend = getResend();
    const response = await resend.emails.send({
      from: process.env.SENDER_EMAIL || '',
      to: process.env.CLIENT_EMAIL || '',
      subject: `SBA-cliente: ${name} | ${mainCategory} | ${serviceCategory} | ${consultationFormat}`,
      html: emailHtml,
    });

    return NextResponse.json({ status: 200, response });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: 500, message: error.message });
    }

    return NextResponse.json(
      { status: 500, message: 'Error desconocido' },
      { status: 500 }
    );
  }
}
