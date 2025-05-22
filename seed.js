const fs = require("fs");

const API_URL = "http://outline:3000/api";

const TOKEN = process.env.OUTLINE_API_TOKEN || "f7a05f3c0ed8413e8a3e1d74053b39d1b45b50c1580d9857df9f7bb1a8a7c2fd";

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

async function postJSON(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed POST ${url}: ${errorText}`);
  }
  return res.json();
}

async function seed() {
  const articles = JSON.parse(fs.readFileSync("articles.json", "utf-8"));
  const collections = {};

  for (const article of articles) {
    let collectionId = collections[article.collection];

    if (!collectionId) {
      const collectionRes = await postJSON(`${API_URL}/collections.create`, {
        name: article.collection,
      });
      collectionId = collectionRes.data.id;
      collections[article.collection] = collectionId;
    }

    await postJSON(`${API_URL}/documents.create`, {
      title: article.title,
      text: article.text,
      collectionId,
    });
  }
}

setTimeout(() => {
  seed().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}, 10000);
