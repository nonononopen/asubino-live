# あづみ野コンサートホール

長野県安曇野市穂高の小さなピアノホール「あづみ野コンサートホール」のウェブサイトです。Figma提出用デザイン（遠藤ちなり）をもとに、HTML / CSS / JS で再現しています。

```
あづみ野コンサートホール
├── assets
│   ├── css      style.css
│   ├── js       main.js
│   └── images   写真・ロゴ（pc / sp）
├── index.html
├── news.html
├── concerts.html
├── concert.html
├── availability.html
├── access.html
└── contact.html
```

## できること

- トップページ（ヒーローカルーセル、ABOUT、NEWS、コンサート、ギャラリー、FEATURES、空き状況カレンダー、アクセス、Music & Café、お問い合わせ）
- お知らせ一覧、コンサート一覧・詳細
- ホール空き状況カレンダー（×印が利用不可）
- お問い合わせ / チケット・ホール予約フォーム（送信はフロントのみ）
- ハンバーガーメニュー、スクロールフェード、ヒーローの切り替えと Ken Burns、スライダー

## ローカルで動かす

```bash
npm install
npm run dev
```

ブラウザで http://127.0.0.1:43141 を開きます。
