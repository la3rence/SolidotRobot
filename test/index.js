const handleRSS = require('../main');

handleRSS().then(list => {
    console.log(list);
    process.exit(0);
});
