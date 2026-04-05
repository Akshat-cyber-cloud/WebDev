import "dotenv/config";
import app from './src/app.js';
import connectDB from './src/config/database.js';
import http from "http";
import { initSocket } from "./src/sockets/server.socket.js";
import { initKeepAlive } from "./src/services/keep-alive.service.js";

const httpServer = http.createServer(app);

initSocket(httpServer);
initKeepAlive();
connectDB();

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})