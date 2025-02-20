
import dotenv from "dotenv";
import express from"express";
import connectDB from "./config/connection";
import cors from "cors";
import taskRoute from './routes/taskRoute'


dotenv.config();
const app = express();
const PORT= process.env.PORT||4000
app.use(cors({origin:"*",methods:"GET,POST,DELETE,PUT",allowedHeaders:"Content-Type"}))
app.use (express.json())
connectDB().then(()=>{
    app.use('/tasks',taskRoute);


    app.get('/', (req, res) => {
        res.send('Task Manager App is working fine :)');
    });
    app.listen(PORT, () => console.log(`Task Manager App Is running on port ${PORT}`));

})

export default app