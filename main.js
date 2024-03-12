import { fetchHtml } from "./lib/import.js";

document.getElementsByTagName("header")[0]
    .replaceWith(await fetchHtml("/html/header.html"));

document.getElementsByTagName("nav")[0]
    .replaceWith(await fetchHtml("/html/navigation.html"));