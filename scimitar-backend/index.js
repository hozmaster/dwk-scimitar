const app = require('./src/app');
const {setupDatabase} = require("./src/db/database");
const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
    setupDatabase().then(() => {
            console.log("The pong Server started in port " + PORT);
        }
    );
});
