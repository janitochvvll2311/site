async function fetchText(url) {
    let response = await fetch(url);
    let text = await response.text();
    return text;
}

async function fetchJson(url) {
    let response = await fetch(url);
    let json = await response.json();
    return json;
}

async function fetchHtml(url) {
    let html = await fetchText(url);
    let template = document.createElement("template");
    template.innerHTML = html;
    return template.content;
}

async function fetchCss(url) {
    let css = await fetchText(url);
    let style = document.createElement("style");
    style.innerHTML = css;
    return style;
}

export {
    fetchText,
    fetchJson,
    fetchHtml,
    fetchCss
}