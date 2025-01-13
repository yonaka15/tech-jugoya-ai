'use client';

import React from 'react';
import Link from 'next/link';
import type { BlogMeta } from '@/types/blog';
import { formatTagForUrl } from '@/lib/tags';

interface LeftSidebarProps {
  meta: BlogMeta;
}

export default function LeftSidebar({ meta }: LeftSidebarProps) {
  return (
    <aside className="space-y-8">
      {/* Tags */}
      {meta.tags.length > 0 && (
        <div>
          <h2 className="font-semibold mb-4">タグ</h2>
          <div className="flex flex-wrap gap-2">
            {meta.tags.map(tag => (
              <Link
                key={tag}
                href={`/tags/${formatTagForUrl(tag)}`}
                className="text-sm px-2 py-1 bg-secondary rounded hover:bg-secondary/80 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Author */}
      <div>
        <h2 className="font-semibold mb-4">著者</h2>
        <div className="text-sm text-muted-foreground">
          {meta.author}
        </div>
      </div>
    </aside>
  );
}