import { revalidatePath, revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

type WebhookPayload = {
  path?: string;
  slug?: string;
  type?: 'page' | 'post' | 'service' | 'unitBusiness' | 'settings';
};

function buildTags(body: WebhookPayload) {
  const tags = new Set<string>();

  switch (body.type) {
    case 'page':
      tags.add('page:list');
      tags.add('navigation');
      if (body.slug) tags.add(`page:${body.slug}`);
      break;
    case 'post':
      tags.add('post:list');
      if (body.slug) tags.add(`post:${body.slug}`);
      break;
    case 'service':
      tags.add('service:list');
      if (body.slug) tags.add(`service:${body.slug}`);
      break;
    case 'unitBusiness':
      tags.add('area:list');
      if (body.slug) tags.add(`area:${body.slug}`);
      break;
    case 'settings':
      tags.add('navigation');
      tags.add('page:list');
      tags.add('post:list');
      tags.add('service:list');
      tags.add('area:list');
      break;
    default:
      break;
  }

  return [...tags];
}

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;

    if (!secret) {
      return new NextResponse('Missing SANITY_REVALIDATE_SECRET', {
        status: 500,
      });
    }

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

    if (!body?.path && !body?.type) {
      return new NextResponse(
        JSON.stringify({ message: 'Missing path or type in payload', body }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const revalidatedTags = buildTags(body || {});

    if (body?.path) {
      revalidatePath(body.path);
    }

    revalidatedTags.forEach((tag) => revalidateTag(tag, 'max'));

    return NextResponse.json({
      message: 'Revalidation completed',
      revalidatedPath: body?.path || null,
      revalidatedTags,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';

    console.error('Error in revalidation:', error);

    return new NextResponse(errorMessage, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
