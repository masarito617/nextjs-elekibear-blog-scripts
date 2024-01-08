#!/bin/bash

##############################
# Netlifyに画像をアップロードし、プレビューファイルを正規のパスに移動する.
##############################

# HELP
function usage {
  cat <<EOM
Usage: $(basename "$0") [OPTION]...
  -h          display help
  -s VALUE    target post slug (empty: all post target)
EOM

  exit 2
}

# 引数取得
PARAM_TARGET_POST_SLUG=''
while getopts ":s:a:h" optKey; do
  case "$optKey" in
    s)
      PARAM_TARGET_POST_SLUG=${OPTARG}
      ;;
    '-h'|'--help'|* )
      usage
      ;;
  esac
done

# 定数読込
source 【PLEASE INPUT PROJECT PATH】/tools/_settings.sh

# Netlify画像格納パス
NETLIFY_CONTENTS_DIR="【PLEASE INPUT PROJECT PATH】/public/netlify-contents/uploads"

# 置換する文字列
REPLACE_FROM_URL="/netlify-contents/uploads/content"
REPLACE_TO_URL="https://wp-next-elekibear-content.netlify.app/content"

# previewフォルダ内から指定されたslugのpostファイルを取得
# slugが指定されていない場合、全てのpostファイルが対象
file_path_list=()
if [ -n "$PARAM_TARGET_POST_SLUG" ]; then
    TARGET_POST_FILE_PATH=${PREVIEW_FILE_DIR}/${PARAM_TARGET_POST_SLUG}.md
    # 指定されたslugのファイルが存在しなければ処理終了
    if [ ! -e $TARGET_POST_FILE_PATH ]; then
        echo "not exists => ${TARGET_POST_FILE_PATH}"
        exit 1
    fi
    file_path_list=($TARGET_POST_FILE_PATH)
else
    file_path_list=`find $PREVIEW_FILE_DIR -type f`
fi

# ローカルの画像類をupload
netlify deploy --prod -d $NETLIFY_CONTENTS_DIR

# ファイルをposts-mdフォルダに移動
for file_path in $file_path_list
do
    # templateファイルは省く
    file_name=`basename $file_path`
    if [ "$file_name" == "$TEMPLATE_FILE_NAME" ]; then
        continue;
    fi
    # 画像URLを正規のものに変換
    sed -i '' -e "s@$REPLACE_FROM_URL@$REPLACE_TO_URL@g" $file_path
    # posts-mdフォルダに移動
    mv $file_path $POSTS_FILE_DIR
    echo "move file => $file_name"
done
