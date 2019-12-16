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

小文字のみを使用する。 

ただし alt 属性など値が文字列の場合は使用可能。

```diff
- <A href="/">Bad</A>

+ <a href="/">OK</a>

+ <a href="/" alt="大文字OK">OK</a>
```

## スペース

半角スペースオンリー

HTML 要素内の無駄なスペースはパフォーマンスも下げるため禁止。

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

## 画像の呼び出し 

`img` 要素を用いて、画像を呼び出す際には必ず `alt` 属性をつけるようにする。 

`alt` は画像が表示されない場合に代替テキストを表示したり、読み上げ機能にも認識される。 Lighthouse のアクセシビリティ評価項目にもあるので対応する。

```diff 
- <img src="hoge.jpg"> 

+ <img src="hoge.jpg" alt="hogeの写真">
```

## JavaScript の呼び出し

`script` 要素には、パフォーマンス向上のため、 `async` か `defer` をつけれないか検討する。

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

## セクション 

`section` 要素を使う際には必ず見出しの要素 (`h1 ~ h6`)を1つ以上包含する。 

```html 
<section>
  <h2>タイトル</h2>
  <p>猫はかわいい</p>
</section>
``` 

::: warning section 要素を利用する上での注意  
要素が単独で機能する場合は `article` 要素を使う。 

`section` 要素を単なる汎用コンテナとしか使わない。
この使い方をするのであれば、その要素は `div` が正しい。 
:::

## リンク 

ページ内リンクや外部サイトへのリンクは `a` 要素を利用する。 

外部サイトへのリンクには別タブで開くように `target="_blank"` に加え `rel="noopener"` を指定する。 

`rel="noopener"` を指定することで、`target="_blank"` のセキュリティとパフォーマンスの低下を防ぐことができる。 

`rel="external"` はそのリンクが外部リンクであることをブラウザに伝える。

```html
<a href="https://eleline.me/" target="_blank" rel="external noopener"></a>
``` 

::: theorem target="_blank" の脆弱性 Tabnabbing について 
target="_blank" を使用して任意のページから別のページにリンクしている場合、リンク元のページとリンク先のページは同じプロセスで動作します。 

そのため、リンク先のページで負荷の高い JavaScript が実行されていると、リンク元のページのパフォーマンスが低下するおそれがあります。

::: right 
From [Tools for Web Developers](https://developers.google.com/web/tools/lighthouse/audits/noopener?hl=ja)

::: 

::: tip nofollow について 
`nofollow` はリンク先のウェブページ評価を無効であることを伝える。 

SEO にも関係があり、`nofollow` を指定することにより、リンク先とサイトを関連付けないように伝えることができる。
::: 

::: theorem rel 属性の種類について 
| rel の値 | 説明 |
| ------------- | ------------- |
| rel="sponsored" | 広告や有料プレースメントのリンク |
| rel="ugc" | コメントやフォーラム投稿など、ユーザー作成コンテンツ（UGC）のリンク | 

::: right 
From [Google Search Concole ヘルプ](https://support.google.com/webmasters/answer/96569?hl=ja)
:::

## リスト 

リストを作る際、 `ul` または `ol` 要素直下に必ず `li` 要素のみを使う。 

```diff 
- <ul>
-     <div>Sample01</div>
-     <div>Sample02</div>
-     <div>Sample03</div>
- </ul>

+ <ul>
+     <li>Sample01</li>
+     <li>Sample02</li>
+     <li>Sample03</li>
+ </ul>
```
 
::: theorem ol 要素との違い 
`ul` 要素には中身の順序に意味を持たず、 `ol` 要素は順序に意味を持つという違いがある。 

::: right 
From [MDN web docs](https://developer.mozilla.org/ja/docs/Web/HTML/Element/ul)
::: 

## ボタン 

ボタンを使う場合は `<input type="button">` よりも `button` 要素を使うようにする。 

理由としては、`<input type="button">` は `value` 属性にテキスト文字列しか設定できないが、`button` 要素には HTML 要素を包含することが可能であること、更に疑似要素を扱えることの2点から。 

::: tip type 属性について 
`button` 要素のデフォルトの `type` 属性は `submit` になっている為、選択するとフォームのデータを送るものになっているが、これは `type` 属性を `button` に変更することで、単なるボタンとして利用することが可能。 
::: 

::: warning 説明テキストを含まない button 要素について 
`button` 要素内に説明テキストを持たない場合 (アイコンのみなど) は、`aria-label` による説明の追加、または要素内に説明テキストを挿入できないかどうか検討する。 

上記の2点のいずれかが不足している場合、読み上げの際にスルーされ、Lighthouse によるアクセシビリティの評価も下がる。 

```html 
<button type="button" aria-label="ホームに戻る">
  <i class="fas fa-home"></i>
</button>
```
:::