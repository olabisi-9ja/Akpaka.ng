import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'AkpakaNG — Where Leather Meets Excellence';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FAF9F6',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            fontFamily: 'serif',
            fontSize: 84,
            letterSpacing: '0.05em',
            color: '#1B1B1B',
            marginBottom: 20,
          }}
        >
          Akpaka.NG
        </div>
        
        {/* Bottom Black Band */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '10%',
            backgroundColor: '#111111',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            left: 0,
            right: 0,
            height: '2%',
            backgroundColor: '#222222',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
