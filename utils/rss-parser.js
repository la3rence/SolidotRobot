import Parser from "rss-parser";

const parser = new Parser({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:141.0) Gecko/20100101 Firefox/141.0',
    },
    requestOptions: {
        rejectUnauthorized: false
    },
    timeout: 5000,
});

export default parser;