# express-post-watcher
* `chokidar`、`socket.io`を使用してフォルダ内の変更監視を行い、通知します。
* 参考記事: </br> https://zenn.dev/mkobayashime/articles/markdown-hot-reload-next-js

## 使用方法
* サーバ側
    * `./settings.ts`に各種設定を記述します。
    * 下記コマンドを実行し、サーバを起動します。
        ```
        # 起動コマンド
        npx ts-node src/index.ts
        ```
* クライアント側
    * `socket.io-client`を介して通知を受け取ります。
        ```
        import { io } from 'socket.io-client';

        ・・・

        // 記事執筆用
        // 変更されたmdファイルの内容を受け取る
        const [hotPostContent, setHotPostContent] = useState<string>();
        useEffect(() => {
            if (process.env.NODE_ENV === 'development') {
            const socket = io('http://localhost:4000');
            socket.on('connect', () => console.log('post-watcher connected.'));
            socket.on('disconnect', () => console.log('post-watcher disconnected.'));

            // 記事データの更新を受け取る
            socket.on('postMdChange', (data: { content: string }) => {
                setHotPostContent(data.content);
            });

            return () => {
                socket.close();
            };
            }
        });
        ```
