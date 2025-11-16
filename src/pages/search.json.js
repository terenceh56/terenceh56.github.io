import {getCollectionByName} from "../utils/getCollectionByName.js";

async function getAllPosts() {
  const collections = ['blog', 'notes', 'thoughts', 'papers'];
  let posts = [];
  for (const name of collections) {
    const items = await getCollectionByName(name);
    posts = posts.concat(items.map(item => ({
      slug: item.slug,
      title: item.data.title,
      description: item.data.description,
      date: item.data.date,
      category: item.data.category,
      tags: item.data.tags,
      collection: name
    })));
  }
  return posts;
}

export async function GET({}) {
  return new Response(JSON.stringify(await getAllPosts()), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
