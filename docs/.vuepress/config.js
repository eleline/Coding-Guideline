module.exports = {
  lang: "ja",
  title: "コーディングガイドライン for ELELINE",
  description: "ELELINEのコーディングガイドライン",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "GitHub", link: "https://github.com/eleline" }
    ],
    sidebar: [
      ["/", "このサイトについて"],
      {
        title: "ガイドライン",
        collapsable: false,
        children: [
          "/guide/dev",
          "/guide/common",
          "/guide/html",
          "/guide/css",
          "/guide/js"
        ]
      }
    ],
    sidebarDepth: 2
  },
  locales: {
    "/": {
      lang: "ja"
    }
  },
  markdown: {
    linkify: true
  },
  plugins: [
    "reading-progress",
    "smooth-scroll",
    [
      "container",
      {
        type: "right",
        defaultTitle: ""
      }
    ],
    [
      "container",
      {
        type: "theorem",
        before: info => `<div class="theorem"><p class="title">${info}</p>`,
        after: "</div>"
      }
    ]
  ]
};
