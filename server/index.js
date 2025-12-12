import express from 'express';
import projectRoutes from './routes/projects.js';

const app = express();
app.use(express.json());


app.use('/api/v1/projects', projectRoutes)

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})