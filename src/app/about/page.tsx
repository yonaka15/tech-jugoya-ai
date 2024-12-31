import { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "About | jugoya.ai",
  description: "tech.jugoya.aiについて",
};

export default function AboutPage() {
  return (
    <Container>
      <div className="prose dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-8">About</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">tech.jugoya.aiについて</h2>
          <p className="mb-4">
            tech.jugoya.aiは、技術的な知見や経験を共有するための個人ブログです。
            主にWeb開発、プログラミング、ソフトウェアエンジニアリングに関する記事を投稿しています。
          </p>
          <p className="mb-4">
            「jugoya（十五夜）」という名前には、満月のように完全を目指しながらも、
            実際には常に変化し続ける存在でありたいという思いが込められています。
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">コンテンツについて</h2>
          <p className="mb-4">
            以下のような内容を中心に発信しています：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>フロントエンド開発（React, Next.js, TypeScript）</li>
            <li>バックエンド開発（Node.js, Python, Go）</li>
            <li>クラウドインフラ（AWS, GCP, Azure）</li>
            <li>開発ツールやプラクティス</li>
            <li>技術キャリアや学習方法</li>
          </ul>
        </section>

        <section className="mb-12">
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
          <p>
            詳しくは各ライセンスのリンク先をご確認ください。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">お問い合わせ</h2>
          <p className="mb-4">
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
      </div>
    </Container>
  );
}
