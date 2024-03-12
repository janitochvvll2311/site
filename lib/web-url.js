class WebUrl extends URL {

    constructor(url, base = undefined) {
        super(url, base);
    }

    ascent(times = 1) {
        let path = this.pathname;
        for (let i = 0; i < times; i++) {
            let index = path.lastIndexOf("/");
            if (index < 0) break;
            path = path.substring(0, index);
        }
        this.pathname = path;
        return this;
    }

    descent(path) {
        if (!this.pathname.endsWith("/"))
            this.pathname += '/';
        this.pathname += path;
        return this;
    }

    navigate(route) {
        if (route.startsWith("/"))
            this.pathname = "";
        let index = 0;
        while ((index = route.indexOf("/")) > 0) {
            let part = route.substring(0, index);
            if (part == "..") this.ascent();
            else this.descent(part);
            route = route.substring(index + 1);
        }
        this.descent(route.substring(index));
        return this;
    }

};


export { WebUrl }