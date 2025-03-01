const handleRSS = require('../main.cjs');
const db = require('../utils/db.cjs');

const test = async () => {
    try {
        const dbCollection = await db.getCollection("solidot");
        handleRSS(dbCollection).then(list => {
            console.log(list);
            process.exit(0);
        });
    }catch (err){
        console.error(err);
    }
   
}
test();

