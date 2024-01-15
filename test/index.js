const handleRSS = require('../main');
const db = require('../utils/db');

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

