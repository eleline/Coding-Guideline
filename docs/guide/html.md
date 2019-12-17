# HTML

HTML は Web コンテンツを作る際に最も多く構築されるマークアップ言語。

HTML は簡単に書けるという話を度々聞くが、セマンティックにマークアップするには HTML についての深い知識が必要だということは忘れないようにする。

以前まで、W3C と HTML Living Standard の 2 つの規格が存在したが、今は Living Standard が標準の規格となっている点には気をつける。

## ファイル拡張子

`.html` を利用する。 `.htm` などは使用しない。

## エンコード/改行コード

UTF-8、LF を使用する

## DOCKTYPE 宣言

XML 宣言は記述しない。

```html
<!DOCTYPE html>
<html></html>
```

## 言語設定

言語設定は日本語にする。

```html
<html lang="ja"></html>
```

## Viewport

これを入れていないと、レスポンシブが上手く動作しなかったり、表示サイズが狂う場合がある。

```html
<meta name="viewport" content="width=device-width,initial-scale=1" />
```

::: warning user-scalable について
`user-scalable` はユーザーが拡大表示の操作ができなくなるので、原則 No に指定しない。

そもそも、iOS 10 以降の Safari では無効化されている。
:::

## 大文字/小文字

小文字のみを使用する。

ただし alt 属性など値が文字列の場合は使用可能。

```html
<!-- 良い例 -->
<a href="/">OK</a>
<a href="/" alt="大文字OK">OK</a>

<!-- 悪い例 要素名と属性が大文字になっている -->
<A HREF="/">Bad</A>
```

## スペース

半角スペースオンリー

HTML 要素内の無駄なスペースは、可読性もパフォーマンスも下げるためフォーマッター等を利用して除外する。

```html
<!-- 良い例 -->
<p>OK</p>

<!-- 悪い例 無駄なスペースが入れられている -->
<p >Bad</ p>
```

## インデント

インデントは半角スペース 2 個分にする。

## ファイルパスの記述法

画像やスクリプトファイルなどへのパスの書き方

### サイト内のリソース

ドキュメントルートからのルートパスで記述する。

```html
<!-- 良い例 -->
<img href="/img/hoge.png" alt="hoge">

<!-- 悪い例 パスの種類が異なる -->
<img href="img/hoge.png" alt="hoge">
<img href="../img/hoge.png" alt="hoge">
<img href="http://example.com/img/hoge.png" alt="hoge">
```

### 外部のリソース

外部リソースの指定は絶対パスを利用する。

SSL 対応されているサイトについては必ず https にする。

```html
<!-- 良い例 -->
<img href="https://orenosite.com/img/hoge.png" alt="hoge">

<!-- 悪い例 http になっている -->
<img href="http://orenosite.com/img/hoge.png" alt="hoge">
```

::: danger 混在コンテンツ 
HTTPS のページ内で HTTP 経由で読み込まれたリソースがあると、混在コンテンツとして認識されてしまう。 

Firefox のコンソールではエラーとして表示され、Chrome は ver79 からデフォルトで混在コンテンツをブロックする方向に進むと発表している。 

- [混在コンテンツ MDN](https://developer.mozilla.org/ja/docs/Security/%E6%B7%B7%E5%9C%A8%E3%82%B3%E3%83%B3%E3%83%86%E3%83%B3%E3%83%84) 
- [Googleの発表 Google Secrity Blog](https://security.googleblog.com/2019/10/no-more-mixed-messages-about-https_3.html) 
:::

## id の利用

id はスタイル適用目的で利用しない。

ページ内での重複がないか気をつける。

## 見出しレベル

見出し要素のレベルは階層を意識してコーディングする。

```html{12}
<!-- 良い例 -->
<h1>見出し1</h1>
<div>見出し1についてのテキスト</div>
<div>なんらかのコンテンツ</div>
<h2>見出し2<h2>
<div>見出し2についてのテキスト</div>

<!-- 悪い例 h1タグが2回使われている上に階層構造が意識されていない -->
<h1>見出し1</h1>
<div>見出し1についてのテキスト</div>
<div>なんらかのコンテンツ</div>
<h1>見出し2<h1>
<div>見出し2についてのテキスト</div>
```

## CSS の呼び出し

ファーストビューに利用する CSS には `rel="preload"` を付ける。

```html
<link rel="preload" href="first-view.css" as="style" />
```

::: theorem preload について
`<link>` 要素の rel 属性で preload を指定すると、 HTML の `<head>` 要素内で読み込みリクエストを宣言し、ページのライフサイクルの早期の、ブラウザーの主なレンダリング機構が起動する前に読み込みを始めたい、すぐに必要なリソースを指定することができます。これにより、そのリソースがより早く利用でき、ページのレンダリングがブロックされにくくなり、性能が向上します。

::: right
From [MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/HTML/Preloading_content)
:::

## 画像の呼び出し

`img` 要素を用いて、画像を呼び出す際には必ず `alt` 属性をつけるようにする。

`alt` は画像が表示されない場合に代替テキストを表示したり、読み上げ機能にも認識される。 Lighthouse のアクセシビリティ評価項目にもあるので対応する。

```html
<!-- 良い例 -->
<img src="hoge.jpg" alt="hogeの写真" />

<!-- 悪い例 代替テキストがない -->
<img src="hoge.jpg" />
```

## JavaScript の呼び出し

`script` 要素には、パフォーマンス向上のため、 `async` か `defer` をつけれないか検討する。

`type` 属性をつける必要はない。

### async

非同期に読み込んで良いスクリプトにつける。

```html
<script src="/assets/js/script.js" async>
```

### defer

前提となるスクリプトがあり、読み込み順のあるスクリプトにつける。

```html
<script src="/assets/js/jquery.js" defer>
<script src="/assets/js/jquery-script.js" defer>
```

## セクショニング

`section` 要素を使う際には必ず見出しの要素 (`h1 ~ h6`)を 1 つ以上包含する。

```html{13,16}
<!-- 良い例 -->
<section>
  <h1>猫についての考察</h1>
  <p>身近にいる猫を見てみよう</p>
  <section>
    <h2>猫はかわいい</h2>
    <p>なんで可愛いのか研究してみた</p>
  </section>
</section>

<!-- 悪い例 p要素に見出しっぽいclassをつけているだけ -->
<section>
  <p class="heading-1">猫についての考察</p>
  <p>身近にいる猫を見てみよう</p>
  <section>
    <p class="heading-2">猫はかわいい</p>
    <p>なんで可愛いのか研究してみた</p>
  </section>
</section>
```

::: warning section 要素を利用する上での注意  
要素が単独で機能する場合は `article` 要素を使う。

`section` 要素を単なる汎用コンテナとしか使わない。
この使い方をするのであれば、その要素は `div` が正しい。

また、`article` 要素も見出しの要素を包含する必要がある。
:::

## リンク

ページ内リンクや外部へのリンクは `a` 要素を利用する。

外部のリンクには別タブで開くように `target="_blank"` に加え `rel="noopener"` を指定する。

`rel="noopener"` を指定することで、`target="_blank"` のセキュリティとパフォーマンスの低下を防ぐことができる。

```html
<a href="https://eleline.me/" target="_blank" rel="noopener"></a>
```

::: tip nofollow について
`nofollow` はリンク先のウェブページ評価を無効であることを伝える。

SEO にも関係があり、`nofollow` を指定することにより、リンク先とサイトを関連付けないように伝えることができる。
:::

::: theorem target="\_blank" の脆弱性について
target="\_blank" を使用して任意のページから別のページにリンクしている場合、リンク元のページとリンク先のページは同じプロセスで動作します。

そのため、リンク先のページで負荷の高い JavaScript が実行されていると、リンク元のページのパフォーマンスが低下するおそれがあります。

::: right
From [Tools for Web Developers](https://developers.google.com/web/tools/lighthouse/audits/noopener?hl=ja)

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

リストをコーディングする際、 `ul` または `ol` 要素直下には必ず `li` か `script` 、 `template` 要素を使う。

`li` 要素内であれば `div` なども使える。
また、`ul` や `ol` も使うことができる。

```html
<!-- 良い例 -->
<ul>
  <li>Sample01</li>
  <li>Sample02</li>
  <li>Sample03</li>
</ul>

<!-- 悪い例 ul要素内にdivが入れらている -->
<ul>
  <div>Sample01</div>
  <div>Sample02</div>
  <div>Sample03</div>
</ul>
```

::: theorem ol 要素との違い
`ul` 要素には中身の順序に意味を持たず、 `ol` 要素は順序に意味を持つという違いがある。

::: right
From [MDN web docs](https://developer.mozilla.org/ja/docs/Web/HTML/Element/ul)
:::

## ボタン

ボタンを使う場合は `<input type="button">` よりも `button` 要素を使うようにする。

理由としては、`<input type="button">` は `value` 属性にテキスト文字列しか設定できないが、`button` 要素には HTML 要素を包含することが可能であること、更に疑似要素を扱えることの 2 点から。

::: tip type 属性について
`button` 要素のデフォルトの `type` 属性は `submit` になっている為、選択するとフォームのデータを送るものになっているが、これは `type` 属性を `button` に変更することで、単なるボタンとして利用することが可能。
:::

::: warning 説明テキストを含まない button 要素について
`button` 要素内に説明テキストを持たない場合 (アイコンのみなど) は、`aria-label` による説明の追加、または要素内に説明テキストを挿入できないかどうか検討する。

上記の 2 点のいずれかが不足している場合、読み上げの際にスルーされ、Lighthouse によるアクセシビリティの評価も下がる。

```html
<button type="button" aria-label="ホームに戻る">
  <i class="fas fa-home"></i>
</button>
```

:::
