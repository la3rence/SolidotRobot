const handleRSS = require('../main');

(async () => await handleRSS())().then(list => {
    console.log(list);
    process.exit(0);
});
