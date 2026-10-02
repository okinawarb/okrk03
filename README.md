# 沖縄Ruby会議03 本リリースサイト

Jekyll 4とTailwind CSSで構築した本リリース用サイトです。最新のスポンサー募集要項・お知らせ・404ページも含みます。

## ローカルで表示

```sh
bundle install
npm ci
bundle exec foreman start
```

http://127.0.0.1:4000/okrk03/ を開きます。トップのCSSは `assets/css/main.css`、お知らせ・募集要項・404のCSSは `assets/css/teaser.css` を編集します。ForemanがJekyllとTailwindの自動ビルドを起動します。

## お知らせを書く

`_posts/YYYY-MM-DD-slug.md` を作成します。例えば `_posts/2026-10-05-sponsor-news.md`:

```markdown
---
title: スポンサー募集について
author: machida
thumbnail: /assets/images/teaser-main-visual.svg
description: 記事の概要をここに書きます。
---

本文をMarkdownで書きます。

## 見出し

[募集要項]({{ '/sponsors/' | relative_url }})
```

レイアウトは自動設定されます。記事は `/okrk03/news/sponsor-news/` に生成され、トップに最新6件、`/okrk03/news/` に全件が新しい順で表示されます。未来の日付の記事は通常のビルドでは表示されず、その日以降の再ビルド時に公開されます。

画像は `assets/images/news/` に置き、`![画像の説明]({{ '/assets/images/news/example.png' | relative_url }})` のように参照します。

カードのサムネイルは記事の `thumbnail` に画像パスを指定します。省略した場合はメインビジュアルを表示します。

OGPサムネイルは **幅1200px × 高さ630px** で作成・書き出します。お知らせカードも同じ比率で表示します。画像ファイル自体の寸法を確認してください。

### 著者を登録する

`_data/authors.yml` に著者IDと表示名を登録します。`url` は任意で、設定すると表示名がプロフィールへのリンクになります。

```yaml
machida:
  name: "@machida"
  avatar: /assets/images/authors/machida.webp
```

記事の先頭に `author: machida` のように著者IDを指定すると、記事ページの日付の横に「@machida」と表示されます。著者の指定がない記事、または未登録のIDを指定した記事では著者欄を表示しません。下書きサンプルを使う際も、自分の著者IDに変更してください。

### 下書き

`_drafts/sample-news.md` をコピーして執筆できます。下書きを確認する場合:

```sh
bundle exec jekyll serve --drafts --host 127.0.0.1 --port 4000
```

公開する際は `_posts/YYYY-MM-DD-slug.md` に移し、サンプル文言を実際の内容に置き換えます。下書きは通常のGitHub Pagesビルドには含まれません。

## ビルドと公開

### 検索・SNS向けの設定

各ページの `title`・`description` を検索結果とSNS共有用のメタ情報に使用します。共有画像は `og_image`、記事の `thumbnail`、`_config.yml` の `og_image` の順で選ばれます。共有画像は1200×630pxで用意してください。画像の説明は `og_image_alt` で指定できます。

正規URL（canonical）とOGP・Xカードは共通レイアウトから出力します。記事には公開日時と登録済みの著者名も出力します。サイトマップは `/okrk03/sitemap.xml` に自動生成され、404ページは検索対象とサイトマップから除外します。

```sh
npm run build
```

生成先は `_site/` です。本ブランチはJekyll 4とTailwindのビルドが必要です。公開前にGitHub Pagesのビルド手順を対応させてください。公開先は https://ruby.okinawa/okrk03/ です。
