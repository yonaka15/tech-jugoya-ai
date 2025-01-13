"use client";

import { useState, useEffect } from "react";

interface ShareButtonProps {
  url: string;
  title: string;
}

export default function ShareButton({ url, title }: ShareButtonProps) {
  const [canShare, setCanShare] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && "share" in navigator);
  }, []);

  // Native Web Share
  const handleShare = async () => {
    try {
      await navigator.share({
        title,
        text: title,
        url,
      });
    } catch {
      // Silent catch
    }
  };

  // Copy URL to clipboard
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setShowCopiedMessage(true);
      setTimeout(() => setShowCopiedMessage(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
      } catch {
        // Silent catch
      }
      document.body.removeChild(textArea);
      setShowCopiedMessage(true);
      setTimeout(() => setShowCopiedMessage(false), 2000);
    }
  };

  // Share to X
  const handleXShare = () => {
    const xShareUrl = `https://x.com/intent/tweet?${new URLSearchParams({
      text: `${title}\n\n`,
      url: url,
    })}`;

    window.open(
      xShareUrl,
      "share-on-x",
      "width=550,height=520,toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=1"
    );
  };

  return (
    <div className="flex gap-4">
      {/* Copy URL Button */}
      <button
        onClick={handleCopyUrl}
        className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors relative"
        aria-label="Copy URL to clipboard"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
        {showCopiedMessage && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-background border px-2 py-1 rounded text-sm whitespace-nowrap">
            URLをコピーしました
          </span>
        )}
      </button>

      {/* Native Share Button */}
      {canShare && (
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Share article"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
        </button>
      )}

      {/* X Share Button */}
      <button
        onClick={handleXShare}
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Share on X"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      </button>
    </div>
  );
}
