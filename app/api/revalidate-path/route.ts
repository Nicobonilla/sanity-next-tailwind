// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

type WebhookPayload = { path?: string };

export async function POST(req: NextRequest) {
  try {
    // Verifica la existencia del secreto de revalidación
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      return new NextResponse('Missing SANITY_REVALIDATE_SECRET', {
        status: 500,
      });
    }

    // Valida la firma del webhook
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      secret
    );

    if (!isValidSignature) {
      return new NextResponse(
        JSON.stringify({ message: 'Invalid signature', body }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verifica que el payload tenga un path válido
    if (!body?.path) {
      return new NextResponse(
        JSON.stringify({ message: 'Missing path in payload', body }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Revalida la ruta especificada
    revalidatePath(body.path);
    const message = `Revalidated route: ${body.path}`;
    return NextResponse.json({ message, revalidated: body.path });
  } catch (err) {
    // Manejo de errores robusto
    console.error('Error in revalidation:', err);
    const errorMessage =
      err instanceof Error ? err.message : 'Unknown error occurred';
    return new NextResponse(errorMessage, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
