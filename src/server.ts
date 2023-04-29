import Express from 'express';

// import routes

import UserRoutes from './routes/UserRoutes';
import AuthRoutes from './routes/AuthRoutes';

// setup

const app = Express();
app.use(Express.json());

// routes

app.use(UserRoutes);
app.use(AuthRoutes);

// initialize app

app.listen(8000, () => {
	console.log('Server running!');
});