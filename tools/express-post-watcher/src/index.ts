import fs from 'fs';
import { createServer } from 'http';
import chokidar from 'chokidar';
import express from 'express';
import { Server } from 'socket.io';
import ToolSettings from './settings';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ToolSettings.CLIENT_URL,
  },
});

// 変更されたファイルを通知する
const onFileChange = async (filePath: string) => {
  const postContent = await fs.readFileSync(filePath, 'utf-8');
  const data = {
    content: postContent,
    filePath: filePath,
  };
  io.emit(ToolSettings.CHANGE_POST_EVENT_NAME, data);
};

// chokidarを用いた変更監視
const watcher = chokidar.watch(ToolSettings.WATCH_POST_DIR, {
  ignoreInitial: true,
});
watcher.on('change', (path) => void onFileChange(path));

// listen開始
const host = 'localhost';
const port = ToolSettings.SEAVER_PORT;
httpServer.listen(port, host, () => {
  io.on('connection', (socket) => {
    // console.log(`connected: ${socket.id}`);
    socket.on('disconnect', () => {
      // console.log(`disconnected: ${socket.id}`);
    });
  });
});
