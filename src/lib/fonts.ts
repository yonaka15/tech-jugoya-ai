import fs from 'fs';
import path from 'path';

// フォントデータを読み込んでBase64エンコードする
function loadFontData() {
  const fontPath = path.join(process.cwd(), 'src', 'assets', 'fonts', 'NotoSansJP-VariableFont_wght.ttf');
  const fontData = fs.readFileSync(fontPath);
  return fontData.toString('base64');
}

// Base64エンコードされたフォントデータを取得
export const notoSansJPBase64 = loadFontData();
