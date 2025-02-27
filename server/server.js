import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'; // Import fileURLToPath
import { dirname } from 'path'; // Import dirname
import sequelize from './config/database.js';
import horseRouter from './routers/horseRouter.js';
import medicalRecordRouter from './routers/medicalRecordRouter.js';
import ridingLogRouter from './routers/ridingLogRouter.js';
import userRouter from './routers/userRouter.js';
import bcrypt from 'bcryptjs'; // Ensure bcryptjs is imported
// import mediaRouter from './routers/mediaRouter.js'; // Uncomment if mediaRouter exists

const app = express();
const port = 3002; // Ensure this matches the port exposed in the Dockerfile

// Middleware to parse JSON requests with increased size limit
app.use(express.json({ limit: '1500mb' }));
app.use(express.urlencoded({ limit: '1500mb', extended: true }));

// Enable CORS for all routes
app.use(cors());

// Middleware to log all requests
app.use((req, res, next) => {
    if(!req.url.includes('uploads')){
    console.log(`${req.method} ${req.url}`);
    }
    next();
});

// Resolve __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//Serve static files
app.use(express.static(path.join(__dirname, 'public')));




// Use routers
app.use('/api/horses', horseRouter);
app.use('/api/medical-records', medicalRecordRouter);
app.use('/api/riding-logs', ridingLogRouter);
app.use('/api/users', userRouter);
// app.use('/api/media', mediaRouter); // Uncomment if mediaRouter exists

// Serve the admin index.html file from /qwerty
app.get('/qwerty/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
});

// Serve the frontend for all other users
app.get(/^\/(?!api|images).*/, (req, res) => {
    console.log(req.method + ' Request Path:', req.path);
    res.sendFile(path.join(__dirname, 'public','client', 'index.html'));
  });

// Ensure the database connection is established before starting the server
sequelize.authenticate().then(() => {
    console.log('Database connected...');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
