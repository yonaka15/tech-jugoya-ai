import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { defaultMetadata } from "@/types/metadata";
import Image from "next/image";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Portfolio | tech.jugoya.ai",
  description: "Webエンジニアのポートフォリオページ",
  alternates: {
    canonical: `${siteConfig.url}/portfolio`,
  },
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Portfolio | tech.jugoya.ai",
    description: "Webエンジニアのポートフォリオページ",
    url: `${siteConfig.url}/portfolio`,
  },
};

// スキル情報
const skills = {
  languages: [
    { name: "Python", years: 13 },
    { name: "TypeScript", years: 5 },
    { name: "JavaScript", years: 13 },
    { name: "Rust", years: 5 },
    { name: "Go", years: 5 },
  ],
  frameworks: [
    { name: "Django", years: 13 },
    { name: "React", years: 13 },
    { name: "Vue.js", years: 13 },
    { name: "Tailwind CSS", years: 5 },
  ],
  databases: [
    { name: "PostgreSQL", years: 13 },
    { name: "InfluxDB", years: 4 },
  ],
  infrastructure: [
    { name: "Ubuntu", years: 13 },
    { name: "AWS", years: 13 },
  ],
};

// スキルカテゴリー
const skillCategories = [
  {
    title: "フロントエンド開発",
    description:
      "モダンなUIライブラリを活用した、ユーザー体験を重視したウェブアプリケーション開発",
    skills: ["React", "Vue.js", "TypeScript", "Next.js", "Tailwind CSS"],
  },
  {
    title: "バックエンド開発",
    description:
      "安全で拡張性の高いAPIとサーバーサイドアプリケーションの設計・実装",
    skills: ["Python", "Django", "Go", "Node.js", "REST API設計"],
  },
  {
    title: "クラウド・インフラ",
    description:
      "クラウド環境における堅牢なインフラ構築とDevOpsプラクティスの実践",
    skills: ["AWS", "Docker", "CI/CD", "Linux", "Vercel"],
  },
  {
    title: "AI・データ分析",
    description: "機械学習モデルの実装と大規模データの効率的な処理・分析",
    skills: ["自然言語処理", "データ可視化", "LLMプロンプト設計"],
  },
];

export default function PortfolioPage() {
  return (
    <Container>
      <div className="prose dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-8">Portfolio</h1>

        {/* プロフィールセクション */}
        <section className="mb-12 flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700 shrink-0 flex-none mx-auto md:mx-0">
            <Image
              src="https://github.com/yonaka15.png"
              alt="プロフィール画像"
              fill
              className="my-0 object-cover"
              priority
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Web Developer</h2>
            <p className="mb-4">
              マルチワーカーとして、エンジニアリングとマネジメントの両方の経験を活かした業務遂行が可能です。現在はIoT・クラウド分野に強みを持つ企業でエンジニアとして働く一方、3D関連企業ではCOOとして「３Dクリエイターのためのプラットフォーム」の開発プロジェクトを推進しています。
            </p>
            <p className="mb-4">
              大学院で神経科学を専攻（修士）し、AI分野での開発経験も豊富です。近年は科学者・AI研究者や企業とAIを使った分析ツール開発に中心的に携わってきました。
            </p>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://github.com/yonaka15"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://x.com/yonaka158"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="https://qiita.com/yonaka15"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <span className="sr-only">Qiita</span>
                <span className="text-sm font-medium">Qiita</span>
              </a>
            </div>
          </div>
        </section>

        {/* 強みセクション */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">強み</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              多様な技術（Python, TypeScript, Rust,
              Go等）に精通した実践的なエンジニアリングスキル
            </li>
            <li>要件定義から実装、運用までの一貫した開発経験</li>
            <li>顧客との折衝・調整能力と企画提案力</li>
            <li>イベント運営・マネジメント経験による組織運営スキル</li>
          </ul>
        </section>

        {/* スキル概要セクション */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">専門領域</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((category, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-t border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-3">{category.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {category.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 技術スキルセクション */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">技術スキル</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">プログラミング言語</h3>
              <div className="space-y-3">
                {skills.languages.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span>{skill.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.years}年
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${Math.min(100, skill.years * 7.5)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">フレームワーク</h3>
              <div className="space-y-3">
                {skills.frameworks.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span>{skill.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.years}年
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{
                          width: `${Math.min(100, skill.years * 7.5)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">データベース</h3>
              <div className="space-y-3">
                {skills.databases.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span>{skill.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.years}年
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{
                          width: `${Math.min(100, skill.years * 7.5)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">インフラ</h3>
              <div className="space-y-3">
                {skills.infrastructure.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span>{skill.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.years}年
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-orange-600 h-2 rounded-full"
                        style={{
                          width: `${Math.min(100, skill.years * 7.5)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 経歴サマリー */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">経歴</h2>

          <div>
            {/* 職歴 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">職歴</h3>

              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                  <h4 className="font-medium">3D関連企業</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    2024年〜現在
                  </span>
                </div>
                <p className="text-sm mb-1 text-blue-600 dark:text-blue-400">
                  COO
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  ３Dクリエイターのためのプラットフォーム開発プロジェクトを推進。サービスリリースに向けた準備を進行中。
                </p>
              </div>

              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                  <h4 className="font-medium">IoT・クラウド企業</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    2023年〜現在
                  </span>
                </div>
                <p className="text-sm mb-1 text-blue-600 dark:text-blue-400">
                  エンジニア
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  IoT技術者講座の講師およびコミュニティ運営など。
                </p>
              </div>

              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                  <h4 className="font-medium">地方メディア企業</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    2012年〜2022年
                  </span>
                </div>
                <p className="text-sm mb-1 text-blue-600 dark:text-blue-400">
                  イベント事業部
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  イベント企画運営を担当。コロナ禍期間中にはイベント運営効率化ツールを開発。
                </p>
              </div>
            </div>

            {/* 学歴 */}
            <div>
              <h3 className="text-xl font-semibold mb-4">学歴</h3>

              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                  <h4 className="font-medium">大学院</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    2007年〜2010年
                  </span>
                </div>
                <p className="text-sm mb-1">修士課程 修了</p>
                <p className="text-gray-600 dark:text-gray-300">
                  生命科学（神経科学）専攻
                </p>
              </div>

              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                  <h4 className="font-medium">大学</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    2003年〜2007年
                  </span>
                </div>
                <p className="text-sm mb-1">理学部 卒業</p>
              </div>
            </div>
          </div>
        </section>

        {/* お問い合わせ */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">お問い合わせ</h2>

          <p className="mb-4">
            お仕事のご依頼やご質問などがありましたら、以下のSNSからご連絡ください。
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/yonaka15"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </a>
            <a
              href="https://x.com/yonaka158"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
              X (Twitter)
            </a>
            <a
              href="https://qiita.com/yonaka15"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Qiita
            </a>
          </div>

          <p className="mt-6">
            ご質問やフィードバックがありましたら、
            <a
              href="https://github.com/yonaka15/tech-jugoya-ai/issues"
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Issues
            </a>
            からお願いします。
          </p>
        </section>

        {/* ライセンス */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">ライセンス</h2>
          <p className="mb-4">
            このサイトのコンテンツは以下のライセンスで提供されています：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              記事コンテンツ：
              <a
                href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
                className="text-blue-600 dark:text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC BY-NC-ND 4.0
              </a>
            </li>
            <li>
              ソースコード：
              <a
                href="https://opensource.org/licenses/Apache-2.0"
                className="text-blue-600 dark:text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apache License 2.0
              </a>
            </li>
          </ul>
          <p>詳しくは各ライセンスのリンク先をご確認ください。</p>
        </section>
      </div>
    </Container>
  );
}
