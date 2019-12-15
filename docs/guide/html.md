# HTML

HTML は Web コンテンツを作る際に最も多く構築されるマークアップ言語。 

HTML は簡単に書けるという話を度々聞くが、セマンティックにマークアップするには HTML についての深い知識が必要だということは忘れないようにする。　

アクセシブルなマークアップが出来るように日々研究しよう。  

## ファイル拡張子

`.html` を利用する。 `.htm` などは使用しない。

## エンコード/改行コード

UTF-8、LF を使用する

## DOCKTYPE 宣言

```html
<!DOCTYPE html>
```

## 言語設定

言語設定は日本語にする。

```html
<html lang="ja"></html>
```

## Viewport

これを入れていないと、レスポンシブが上手く動作しなかったり、表示サイズが狂う場合がある。

```html
<meta name="viewport" content="width=device-width,initial-scale=1">
```

::: warning user-scalable について
`user-scalable` はユーザーが拡大表示の操作ができなくなるので、原則 No に指定しない。 

そもそも、iOS 10 以降の Safari では無効化されている。
:::

## 大文字/小文字

小文字のみを使用する
ただし alt 属性など値が文字列の場合は使用可能

```diff
- <A href="/">Bad</A>

+ <a href="/">OK</a>

+ <a href="/" alt="大文字OK">OK</a>
```

## スペース

半角スペースオンリー

HTML タグ内の無駄なスペースはパフォーマンスも下げるため禁止。

```diff
- <p >Bad</p>

+ <p>OK</p>
```

## インデント

インデントは半角スペース2個分にする。

## ファイルパスの記述法

画像やスクリプトファイルなどへのパスの書き方

### サイト内のリソース

ドキュメントルートからの相対パスで記述する。

```diff
- <a href="img/hoge.png">
- <a href="../img/hoge.png">
- <a href="http://example.com/img/hoge.png">

+ <a href="/img/hoge.png">
```

### 外部のリソース

リソースの絶対パスで記述する。

```diff
+ <a href="//orenosite.com/img/hoge">
``` 

## CSS の呼び出し 

ファーストビューに利用する CSS には `rel="preload"` を付ける。 

```html
<link rel="preload" href="first-view.css" as="style">
```

::: theorem preload について 
`<link>` 要素の rel 属性で preload を指定すると、 HTML の `<head>` 要素内で読み込みリクエストを宣言し、ページのライフサイクルの早期の、ブラウザーの主なレンダリング機構が起動する前に読み込みを始めたい、すぐに必要なリソースを指定することができます。これにより、そのリソースがより早く利用でき、ページのレンダリングがブロックされにくくなり、性能が向上します。 

::: right 
From [MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/HTML/Preloading_content)
:::

## JavaScript の呼び出し

`script` タグには、パフォーマンス向上のため、 `async` か `defer` をつけれないか検討する。

### async 

非同期に読み込んで良いスクリプトにつける。 

```diff
- <script src="/assets/js/script.js">

+ <script src="/assets/js/script.js" async>
```

### defer 

前提となるスクリプトがあり、読み込み順のあるスクリプトにつける。

```diff
- <script src="/assets/js/jquery.js">
- <script src="/assets/js/jquery-script.js">

+ <script src="/assets/js/jquery.js" defer>
+ <script src="/assets/js/jquery-script.js" defer>
```
