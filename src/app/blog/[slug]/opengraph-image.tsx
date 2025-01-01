import { ImageResponse } from 'next/og';
import { headers } from 'next/headers';
import { siteConfig } from '@/config/site';

export const runtime = 'edge';

export const alt = 'Blog Post Image';
export const size = {
  width: siteConfig.ogImage.width,
  height: siteConfig.ogImage.height,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  try {
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const response = await fetch(
      `${protocol}://${host}/api/posts/${params.slug}`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      return new Response('Not Found', { status: 404 });
    }

    const post = await response.json();

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
                fontSize: '60px',
                color: siteConfig.theme.colors.text.primary,
                lineHeight: 1.4,
                margin: '0 0 20px 0',
                maxWidth: '1000px',
              }}
            >
              {post.meta.title}
            </h1>
            <p
              style={{
                fontSize: '32px',
                color: siteConfig.theme.colors.primary,
                margin: 0,
                maxWidth: '800px',
              }}
            >
              {post.meta.description}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <img
                src={siteConfig.author.avatarUrl}
                width="40"
                height="40"
                style={{
                  borderRadius: '20px',
                }}
              />
              <span
                style={{
                  fontSize: '24px',
                  color: siteConfig.theme.colors.text.primary,
                }}
              >
                @{siteConfig.author.github}
              </span>
            </div>
            <span
              style={{
                fontSize: '24px',
                color: siteConfig.theme.colors.primary,
              }}
            >
              {siteConfig.name}
            </span>
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