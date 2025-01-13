"use client";

import ShareButton from "@/components/blog/ShareButton";

interface RightSidebarProps {
  url: string;
  title: string;
}

export default function RightSidebar({ url, title }: RightSidebarProps) {
  return (
    <aside className="space-y-8">
      <div className="mt-8">
        <h2 className="font-semibold mb-4 text-base">記事をシェア</h2>
        <ShareButton url={url} title={title} />
      </div>
    </aside>
  );
}

