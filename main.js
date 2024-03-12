import { fetchHtml, fetchJson } from "./lib/import.js";

document.getElementsByTagName("header")[0]
    .replaceWith(await fetchHtml("/html/header.html"));

document.getElementsByTagName("nav")[0]
    .replaceWith(await fetchHtml("/html/navigation.html"));

let index = await fetchJson("/data/posts/index.json");
let html = await fetchHtml(`/data/posts/${index[0].file}`);
document.body.appendChild(html);