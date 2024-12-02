import express from 'express'
import { config } from './config';
import { registerRouters } from './routers';
import { AppDataSource } from './providers/db.provider';

const startServer = (port: number) => {
    const app = express(); 

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    registerRouters(app);

    app.listen(port, () => console.log('Listen port:', port));
}

AppDataSource.initialize().then(() => {
    startServer(config.port);
}).catch(console.error);

