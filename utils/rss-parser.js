const Parser = require('rss-parser');

const parser = new Parser({
    customFields: {
        item: ['magnet'],
    },
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
    },
    requestOptions: {
        rejectUnauthorized: false
    },
});

module.exports = parser;