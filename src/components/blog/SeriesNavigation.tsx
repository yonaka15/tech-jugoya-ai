import React from 'react';
import Link from 'next/link';

type SeriesNavigationProps = {
  title: string;
  parts: Array<{
    slug: string;
    title: string;
    description: string;
  }>;
  currentSlug?: string;
  baseSlug: string;
};

export const SeriesNavigation: React.FC<SeriesNavigationProps> = ({
  title,
  parts,
  currentSlug,
  baseSlug,
}) => {
  return (
    <nav className="my-8 p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-3">
        {parts.map((part, index: number) => (
          <div
            key={part.slug}
            className={`flex flex-col ${
              part.slug === currentSlug ? 'text-blue-600 dark:text-blue-400' : ''
            }`}
          >
            <Link
              href={`/blog/${baseSlug}/${part.slug}`}
              className={`hover:underline ${
                part.slug === currentSlug ? 'font-medium' : ''
              }`}
            >
              {index + 1}. {part.title}
            </Link>
            {part.slug === currentSlug && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {part.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};
