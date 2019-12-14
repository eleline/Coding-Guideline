module.exports = {
  lang: "ja",
  title: "コーディングガイドライン",
  description: "ELELINEのコーディングガイドライン",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/guide/html" },
      { text: "GitHub", link: "https://github.com/eleline" }
    ],
    sidebar: [
      ["/", "コーディングガイドラインについて"],
      {
        title: "ガイドライン",
        collapsable: false,
        children: ["/guide/dev", "/guide/html", "/guide/css"]
      }
    ]
  },
  locales: {
    "/": {
      lang: "ja"
    }
  }
};
