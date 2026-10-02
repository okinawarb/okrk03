# 沖縄Ruby会議03

Jekyllで構築した公式サイトです。

```sh
bundle install
npm install
bundle exec foreman start
```

ForemanがJekyllとTailwind CSSのwatchを同時に起動します。
`http://localhost:4000` をブラウザで開いて確認できます。

本番用のファイルを生成する場合は、次を実行します。

```sh
npm run build
```

## お知らせの追加

`_posts/YYYY-MM-DD-slug.md` を追加すると、トップのNEWSに新しい順で最大6件表示されます。
画像は `assets/images/news/` に置き、記事ごとに `thumbnail` で指定します（推奨比率 2:1）。

```yaml
---
layout: post
title: 記事のタイトル
description: 一覧に表示する紹介文
thumbnail: /assets/images/news/example.webp
permalink: /news/example/
---
ここに記事の本文を書きます。
```
