import rss from '@astrojs/rss';
import { site } from "../consts";
import getUrl from "../utils/getUrl.js";
import { getCollection } from "astro:content";
import { getCollectionByName } from "@/utils/getCollectionByName";
import { sortPostsByDate } from "@/utils/sortPostsByDate";

export async function GET(context) {
  const posts = await getCollectionByName('notes')
  let sortPosts = await sortPostsByDate(posts);
  let recentPosts = sortPosts.splice(0, 20);

  return rss({
    title: site.title,
    description: site.description,
    site: site.url,
    items: recentPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description ? post.data.description : post.body.substring(0, 140).replace(/#/gi, "") + "...",
      // Compute RSS link from post `slug`
      link: `${getUrl("/")}${post.collection}/${post.slug}/`,
    })),
  });
}
