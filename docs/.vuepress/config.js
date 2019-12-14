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
        children: ["/guide/dev", "/guide/common", "/guide/html", "/guide/css"]
      },
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
  }
};
