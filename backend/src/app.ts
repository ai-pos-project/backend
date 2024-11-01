import express, { Request, Response } from 'express';
import "reflect-metadata";
import { Database } from './Database/data-source.js';
import userRouter from './Router/userRouter.js';
import managerRouter from './Router/managerRouter.js';
import goodRouter from './Router/goodRouter.js';
import { errorHandler } from './Middleware/errorHandler.js';
import cors from 'cors';
// import { fileURLToPath } from 'url';
// import path, { dirname } from 'path';
const app = express();
const port = 3000;

app.use(cors());
// app.use(express.static('/app/src/Database/FaceModel/faceModel/Data'));
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.use(express.static(path.join(__dirname, './Database/FaceModel/faceModel/Data')));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use('/api/1.0/manager', managerRouter);
app.use('/api/1.0/user', userRouter);
app.use('/api/1.0/good', goodRouter);


app.get('/api/1.0/health', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});

app.use(errorHandler);

Database.initialize().then(() => {
    console.log("Database initialized successfully");
    app.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
}).catch(err => {
    console.error("Failed to initialize the database:", err);
});

export default app;