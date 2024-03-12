import { fetchHtml, fetchJson } from "./lib/import.js";
import { WebUrl } from "./lib/web-url.js";

let postTemplate = await fetchHtml("/data/posts/item-template.html");

function bindPost(element, item, index) {
    if (!element) element = postTemplate.firstElementChild.cloneNode(true);

    element.children[0].innerText = item.title;
    element.children[0].href = item.href;
    element.children[1].innerText = item.description;

    return element;
}

async function updatePostList() {
    let posts = await fetchJson("/data/posts/index.json");
    let postList = document.getElementById("postList");
    for (let i in posts) {
        if (postList.children.length > i) {
            let element = postList.children[i];
            bindPost(element, posts[i], i);
        }
        else {
            let element = bindPost(null, posts[i], i);
            postList.append(element);
        }
    }
    while (postList.children.length > posts)
        postList.lastElementChild.remove();
}

updatePostList();