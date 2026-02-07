import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contacts.js';
import expertRoutes from './routes/experts.js';
import project_creatorRoutes from './routes/project_creators.js';
import projectRoutes from './routes/projects.js';
import serviceRoutes from './routes/services.js';
import userRoutes from './routes/users.js';

dotenv.config();
const app = express();
app.use(express.json());

// cors
app.use(cors({
    origin: 'https://agency-client-ten.vercel.app', // Update this to your frontend URL
    credentials:true,
}))

const port = process.env.PORT || 5000; 

// Health check endpoint (add this!)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/experts', expertRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/contacts', contactRoutes);
app.use('/api/v1/project_creators', project_creatorRoutes);


// default error handler
const errorHandler = (err, req, res, next) => {
    if(res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err.message });
};

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})