import dotenv from 'dotenv';
import express from 'express';
import contactRoutes from './routes/contacts.js';
import expertRoutes from './routes/experts.js';
import project_creatorRoutes from './routes/project_creators.js';
import projectRoutes from './routes/projects.js';
import serviceRoutes from './routes/services.js';
import userRoutes from './routes/users.js';

const app = express();
app.use(express.json());
dotenv.config();
const port = process.env.PORT || 5000; 


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