export const siteConfig = {
  // サイト基本情報
  name: "tech.jugoya.ai",
  description: "技術ブログ",
  url: "https://tech.jugoya.ai",
  locale: "ja_JP",

  // 著者情報
  author: {
    name: "yonaka15",
    twitter: "@yonaka158",
    github: "yonaka15",
    avatarUrl: "https://github.com/yonaka15.png",
  },

  // メタデータ設定
  metadata: {
    title: {
      default: "tech.jugoya.ai",
      template: "%s | tech.jugoya.ai",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  },

  // OGP画像設定
  ogImage: {
    width: 1200,
    height: 630,
    defaultAlt: "tech.jugoya.ai",
  },

  // デザイン設定
  theme: {
    gradient: "linear-gradient(to bottom right, #0f172a, #1e293b)",
    colors: {
      primary: "#94a3b8",
      text: {
        primary: "white",
        secondary: "#94a3b8",
      },
    },
  },
} as const;

