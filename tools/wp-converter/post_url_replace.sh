#!/bin/bash

##############################
# WordPress記事ファイル内のURLを変換する
##############################

# 画像参照先を画像サーバURLに置き換え
cd 【PLEASE INPUT PROJECT PATH】/data
find ./ -name '*.txt' -exec sed -i '' 's@http://localhost:8000/wp-content/uploads@https://wp-next-elekibear-content.netlify.app/wp-content/uploads@gI' {} \;
find ./ -name '*.csv' -exec sed -i '' 's@http://localhost:8000/wp-content/uploads@https://wp-next-elekibear-content.netlify.app/wp-content/uploads@gI' {} \;

# 記事リンクをelekibear.comに置き換え
find ./ -name '*.txt' -exec sed -i '' 's@http://localhost:8000@https://elekibear.com@gI' {} \;

# 記事リンクを新スタイルに合わせる
# categoryはクエリパラメータになったので個別対応
find ./ -name '*.txt' -exec sed -i '' 's@https://elekibear.com/category/@/?category=@gI' {} \;
find ./ -name '*.txt' -exec sed -i '' 's@href="https://elekibear.com@href="/post@gI' {} \;
