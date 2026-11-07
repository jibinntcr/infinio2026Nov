import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Infinio Technology Solutions — Intelligent Technology. Practical Business Impact.';
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
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#ffffff',
          backgroundImage:
            'radial-gradient(circle at 85% 20%, #e0f2fe 0%, #f0fdfa 45%, #ffffff 85%)',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              padding: '8px 16px',
              borderRadius: '999px',
              backgroundColor: '#f0f9ff',
              border: '1px solid #bae6fd',
              color: '#0284c7',
              fontSize: '18px',
              fontWeight: 700,
            }}
          >
            INFINIO TECHNOLOGY SOLUTIONS
          </div>
          <span style={{ fontSize: '17px', fontWeight: 600, color: '#475569' }}>
            Kochi (CIAL Aero Park) • Thrissur • Dubai
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '980px' }}>
          <div
            style={{
              fontSize: '62px',
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#0f172a',
              letterSpacing: '-0.03em',
            }}
          >
            Intelligent Technology.
          </div>
          <div
            style={{
              fontSize: '62px',
              fontWeight: 800,
              lineHeight: 1.1,
              background: 'linear-gradient(90deg, #0d9488 0%, #0284c7 50%, #2563eb 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.03em',
              marginTop: '6px',
            }}
          >
            Practical Business Impact.
          </div>
          <p
            style={{
              fontSize: '24px',
              color: '#334155',
              marginTop: '24px',
              lineHeight: 1.45,
            }}
          >
            Custom Software • Web Platforms • Cloud Infrastructure • Digital Automation
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #e2e8f0',
            paddingTop: '24px',
            fontSize: '18px',
            color: '#475569',
          }}
        >
          <span>info@infinio.co.in • Partnering with businesses since 2016</span>
          <span style={{ color: '#0d9488', fontWeight: 700 }}>Kerala & UAE</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
