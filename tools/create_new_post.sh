#!/bin/bash

##############################
# templateファイルから新しいpostファイルを作成する.
##############################

# 定数読込
source 【PLEASE INPUT PROJECT PATH】/tools/_settings.sh

# slug入力を促す
read -p "please input slug: " slug
new_file_name=$slug".md"

# 既に存在済のslugでないかチェック
file_path_list=`find $POSTS_FILE_DIR -type f`
for file_path in $file_path_list
do
    file_name=`basename $file_path`
    if [ "$file_name" == "$new_file_name" ]; then
        echo "oh, already exist slug..."
        exit 1
    fi
done

# _templateをコピーslugのmdファイルを作成する
template_file_path="$PREVIEW_FILE_DIR/$TEMPLATE_FILE_NAME"
new_file_path="$PREVIEW_FILE_DIR/$new_file_name"
cp $template_file_path $new_file_path
echo "create => $new_file_path"

# 対象の文字列を置換
date=`date "+%Y-%m-%d"`
sed -i '' -e "s/<DATE>/$date/g" $new_file_path
sed -i '' -e "s/<SLUG>/$slug/g" $new_file_path
