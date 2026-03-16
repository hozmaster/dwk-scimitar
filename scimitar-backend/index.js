const app = require('./src/app');
const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
    console.log("The Pong server started in port " + PORT);
});
