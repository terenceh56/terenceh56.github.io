// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import type { AnalyticsConfig } from "./types/analyticsTypes"

/**
 * title {string} website title
 * favicon {string} website favicon url
 * description {string} website description
 * author {string} author
 * avatar {string} Avatar used in the profile
 * motto {string} used in the profile
 * url {string} Website link
 * baseUrl {string} When using GitHubPages, you must enter the repository name, startWith '/', e.g. /repo_name
 * recentBlogSize {number} Number of recent articles displayed in the sidebar
 * archivePageSize {number} Number of articles on archive pages
 * postPageSize {number} Number of articles on blog pages
 * feedPageSize {number} Number of articles on feed pages
 * beian {string} Chinese policy
 * asideTagsMaxSize {number}
 *    0: disable,
 *    > 0: display the limited number of tags in the sidebar
 *    All tags will be displayed in single page "/tags".
 */
export const site = {
  title: 'Terence', // required
  favicon: '/favicon.svg', // required
  description: 'Welcome to my page! ',
  author: "Terence", // required
  avatar: '/avatar.png', // required
  url: 'https://terenceh56.github.io', // required
  baseUrl: '', // When using GitHubPages, you must enter the repository name startWith '/'. e.g. '/astro-blog'
  motto: ` 'Don't think about what you want to be, but what you want to do.' -Richard P. Feynman`,
  recentBlogSize: 5,
  archivePageSize: 25,
  postPageSize: 10,
  feedPageSize: 20,
  beian: '',
  asideTagsMaxSize: 0,
}

/** 
 * busuanzi {boolean} link: https://busuanzi.ibruce.info/
 * lang {string} Default website language
 * codeFoldingStartLines {number}
 * ga {string|false}
 * memosUrl {string} memos server url
 * memosUsername {string} memos login name
 * memosPageSize {number} 10
 */

export const config = {
  lang: 'en', // en | zh-cn | zh-Hant | cs
  codeFoldingStartLines: 16, // Need to re-run the project to take effect

  // memos config
  memosUrl: '', // https://xxxx.xxx.xx
  memosUsername: '', // login name
  memosPageSize: 10, // number
}

/**
 * Navigator
 * name {string}
 * iconClass {string} icon style
 * href {string}  link url
 * target {string} optional "_self|_blank" open in current window / open in new window
 */
export const categories = [

  // {
  //   name: "Memos",
  //   iconClass: "ri-quill-pen-line",
  //   href: "/memos",
  // },
  {
    name: "Notes",
    iconClass: "ri-draft-line",
    href: "/notes",
  },
  {
    name: "Beyond the Surface",
    iconClass: "ri-compass-3-line",
    href: "/beyond-surface",
  },

  {
    name: "Comments",
    iconClass: "ri-chat-1-line",
    href: "/comments/1",
  },
  {
    name: "Search",
    iconClass: "ri-search-line",
    href: "/search",
  },

  {
    name: 'About',
    iconClass: 'ri-information-line',
    href: '/about',
  },

]

/**
 * Personal link address
 export const infoLinks = [
  //{
  //  icon: 'ri-telegram-fill',
  //  name: 'telegram',
  //  outlink: '',
  //},
  //{
  //  icon: 'ri-twitter-fill',
  //  name: 'twitter',
  //  outlink: '',
  //},
  {
    icon: 'ri-instagram-fill',
    name: 'instagram',
    outlink: 'https://instagram.com/t_hsu5.6',
  },
  {
    icon: 'ri-github-fill',
    name: 'github',
    outlink: 'https://github.com/terenceh56',
  },
]

*/
// Friendship links removed per user request

/**
 * Comment Feature
 * enable {boolean}
 * type {string} required waline | giscus
 * walineConfig.serverUrl {string} server link
 * walineConfig.lang {string} link: https://waline.js.org/guide/features/i18n.html
 * walineConfig.pageSize {number} number of comments per page. default 10
 * walineConfig.wordLimit {number} Comment word s limit. When a single number is filled in, it 's the maximum number of comment words. No limit when set to 0
 * walineConfig.count {number} recent comment numbers
 * walineConfig.pageview {boolean} display the number of page views and comments of the article
 * walineConfig.reaction {string | string[]} Add emoji interaction function to the article
 * walineConfig.requiredMeta {string[]}  Set required fields, default anonymous
 * walineConfig.whiteList {string[]} set some pages not to display reaction
 */
export const comment = {
  enable: true,
  type: 'disqus', // waline | giscus | disqus,
  walineConfig: {
    serverUrl: "",
    lang: 'en',
    pageSize: 20,
    wordLimit: '',
    count: 5,
    pageview: true,
    reaction: false,
    requiredMeta: ["nick"],
    whiteList: ['/comments/'],
  },

  // giscus config
  giscusConfig: {
    'data-repo': "",
    'data-repo-id': "",
    'data-category': "",
    'data-category-id': "",
    'data-mapping': "",
    'data-strict': "",
    'data-reactions-enabled': "",
    'data-emit-metadata': "",
    'data-input-position': "",
    'data-theme': "",
    'data-lang': "",
    'crossorigin': "",
  }

  //
}

export const DISQUS_SHORTNAME = "terenceh56";

/**
 * Analytics Feature Configuration
 *
 * This file centralizes the analytics configuration for the application.
 * It defines and exports the default settings for Umami and Google Analytics.
 */
export const analytics: AnalyticsConfig = {
  enable: true,
  umamiConfig: {
    enable: false,
    id: "",
    url: ""
  },
  gaConfig: {
    enable: false,
    id: ""
  },
  busuanzi: true,
};

/**
 * Passcode Protection Configuration
 * 
 * enable {boolean} Enable/disable passcode protection
 * protectedTags {string[]} Posts with these tags will require passcode
 * passcode {string} The passcode required to unlock protected posts
 * storageKey {string} localStorage key for authentication state
 */
export const passcodeProtection = {
  enable: false,
  protectedTags: ['mood'], // Add or remove tags as needed
  passcode: 'th56/', // CHANGE THIS to your desired passcode
  storageKey: 'blog-auth-token',
};