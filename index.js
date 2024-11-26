import app from "./app.js";
import connectDB from "./db/index.js";

const port = process.env.PORT || 5000;

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
})
.catch((error) => {
    console.log('Error in connecting DB: ', error.message)
    process.exit(1)
})