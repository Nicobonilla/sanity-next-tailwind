import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

type WebhookPayload = { path?: string };

export async function POST(req: NextRequest) {
  try {
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return new Response(
        'Missing environment variable SANITY_REVALIDATE_SECRET',
        { status: 500 }
      );
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      const message = 'Invalid signature';
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    } else if (!body?.path) {
      const message = 'Bad Request';
      return new Response(JSON.stringify({ message, body }), { status: 400 });
    }

    revalidatePath(body.path);
    const message = `Updated route: ${body.path}`;
    return NextResponse.json({ body, message });
  } catch (err) {
    // Aseguramos que el error tiene la propiedad message
    if (err instanceof Error) {
      console.error(err.message);
      return new Response(err.message, { status: 500 });
    } else {
      console.error('Unknown error', err);
      return new Response('Unknown error occurred', { status: 500 });
    }
  }
}
