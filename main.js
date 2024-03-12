import { WebUrl } from "./lib/web-url.js";
import {fetchCss, fetchHtml} from "./lib/import.js";

console.log(await fetchHtml("index.html"));
console.log(await fetchCss("main.css"));