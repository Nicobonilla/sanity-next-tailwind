import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// This comment is important for Next.js to understand this is JSX for OG images
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        SB
      </div>
    ),
    { ...size }
  );
}
