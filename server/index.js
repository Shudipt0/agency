import express from 'express';
import contactRoutes from './routes/contacts.js';
import expertRoutes from './routes/experts.js';
import projectRoutes from './routes/projects.js';
import serviceRoutes from './routes/services.js';
import userRoutes from './routes/users.js';

const app = express();
app.use(express.json());


app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/experts', expertRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/contacts', contactRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})