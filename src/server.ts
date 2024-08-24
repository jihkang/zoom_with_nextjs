import { createServer, Server } from "http";
import next from "next";


const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({dev, hostname, port});
const handler = app.getRequestHandler();

app.prepare().then(() => {
    // handler setting
    const httpServer = createServer(handler);
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        console.log("socket connected!!");

        socket.on("disconnect", (socket) => {});
    });

    httpServer.once("error", (err) => {
        console.log(err);
        process.exit(1);
    })
    .listen(port, () => {
        console.log(`Ready on http://${hostname}:${port}`);
    });
})