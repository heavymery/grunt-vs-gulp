# Grunt vs Gulp

Grunt と Gulp で簡単なビルド環境を作って行くリポジトリです。

各ツールの設定を段階別でブランチに分けてあります。ブランチを切り替えた後に「Download ZIP」ボタンでそのブランチの最終版ソースコードをダウンロードできます。

**Grunt**

1. [getting-started](https://github.com/heavymery/grunt-vs-gulp/tree/getting-started) - サンプルの HTML/CSS/JS テンプレートが置いてあります。
2. [grunt/init-grunt](https://github.com/heavymery/grunt-vs-gulp/tree/grunt/init-grunt) - Grunt の導入からタスク登録まで。
3. [grunt/preview-task](https://github.com/heavymery/grunt-vs-gulp/tree/grunt/preview-task) - ローカルサーバーを立ち上げる。
4. [grunt/livereload-task](https://github.com/heavymery/grunt-vs-gulp/tree/grunt/livereload-task) - LiveReload 機能を導入する。
5. [grunt/build-task](https://github.com/heavymery/grunt-vs-gulp/tree/grunt/build-task) - ビルド！（Unify & Minify, 画像圧縮、ブラウザーキャッシュ対応）
6. [grunt/optimize-grunt](https://github.com/heavymery/grunt-vs-gulp/tree/grunt/optimize-grunt) - Grunt タスクをより使うやすく！

**Gulp**

〜まだ〜

## Install 

### Node.js 

Grunt, Gulp を使うには [Node.js](http://nodejs.org/) が必要です。

### Grunt-CLI

Grunt を使うには `grunt-cli` がグローバルでインストールされている必要があります。

```sh
$ npm install grunt-cli -g
```

### Gulp

Gulp は `gulp` だけグローバルでインストールすれば良いです。

```sh
$ npm install gulp -g
```

### Node modules

Grunt, Gulp の各種プラグインは `npm` でインストールできます。

```sh
$ npm install <プラグイン名>
```

`--save-dev` オプションを付けるとインストールと同時にバージョン情報が `package.json` に記載されます。

```sh
$ npm install <プラグイン名>
```

`package.json` に記載されているモジュールは `npm` コマンドより一括でインストールできます。

```sh
$ npm install
```

