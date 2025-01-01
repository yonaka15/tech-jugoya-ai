import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

export const runtime = 'edge';

export const alt = siteConfig.ogImage.defaultAlt;
export const size = {
  width: siteConfig.ogImage.width,
  height: siteConfig.ogImage.height,
};
export const contentType = 'image/png';

export default async function Image() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            background: siteConfig.theme.gradient,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: '40px 60px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <h1
              style={{
                fontSize: '72px',
                color: siteConfig.theme.colors.text.primary,
                lineHeight: 1.4,
                margin: '0 0 20px 0',
              }}
            >
              {siteConfig.name}
            </h1>
            <p
              style={{
                fontSize: '36px',
                color: siteConfig.theme.colors.primary,
                margin: 0,
              }}
            >
              {siteConfig.description}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <img
                src={siteConfig.author.avatarUrl}
                width="48"
                height="48"
                style={{
                  borderRadius: '24px',
                }}
              />
              <span
                style={{
                  fontSize: '28px',
                  color: siteConfig.theme.colors.text.primary,
                }}
              >
                @{siteConfig.author.github}
              </span>
            </div>
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Error generating image', { status: 500 });
  }
}