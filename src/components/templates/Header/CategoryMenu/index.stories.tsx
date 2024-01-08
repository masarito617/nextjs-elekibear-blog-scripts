import { Meta } from '@storybook/react';
import CategoryMenu from '.';
import SiteSettings from 'settings/SiteSettings';

export default { title: 'Molecules/CategoryMenu' } as Meta<typeof CategoryMenu>;

export const Standard = () => (
  <CategoryMenu
    allCategories={JSON.parse(apiResponse)}
    menuPathArray={SiteSettings.CategoryMenuPathArray}
  />
);

// レスポンスデータ
const apiResponse = `
{
      "categories": {
        "edges": [
          {
            "node": {
              "id": "dGVybTo0Ng==",
              "name": "Blender",
              "parentId": "dGVybTo0NA==",
              "slug": "blender",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybToxMjk=",
              "name": "C#",
              "parentId": "dGVybTo1Mw==",
              "slug": "csharp",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo1Nw==",
              "name": "C++",
              "parentId": "dGVybTo0NA==",
              "slug": "game-cpp",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo2OA==",
              "name": "Docker",
              "parentId": "dGVybTo1Mw==",
              "slug": "docker",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo0Mg==",
              "name": "DTM",
              "parentId": "dGVybToz",
              "slug": "dtm",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybToxNjY=",
              "name": "Flutter",
              "parentId": "dGVybTo1Mw==",
              "slug": "flutter",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo1OA==",
              "name": "GBDK",
              "parentId": "dGVybTo0NA==",
              "slug": "gbdk",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo1Mw==",
              "name": "IT関連",
              "parentId": null,
              "slug": "it",
              "children": {
                "nodes": [
                  {
                    "id": "dGVybToxMjk="
                  },
                  {
                    "id": "dGVybTo2OA=="
                  },
                  {
                    "id": "dGVybToxNjY="
                  },
                  {
                    "id": "dGVybTo2Ng=="
                  },
                  {
                    "id": "dGVybTo2OQ=="
                  },
                  {
                    "id": "dGVybTo2NQ=="
                  },
                  {
                    "id": "dGVybTo2Nw=="
                  },
                  {
                    "id": "dGVybTo3MA=="
                  },
                  {
                    "id": "dGVybToxMTk="
                  },
                  {
                    "id": "dGVybTo4OQ=="
                  },
                  {
                    "id": "dGVybTo2NA=="
                  },
                  {
                    "id": "dGVybTo3Ng=="
                  },
                  {
                    "id": "dGVybTo3Mw=="
                  },
                  {
                    "id": "dGVybTo3Mg=="
                  },
                  {
                    "id": "dGVybTo3NA=="
                  },
                  {
                    "id": "dGVybTo0OQ=="
                  },
                  {
                    "id": "dGVybToxNTI="
                  },
                  {
                    "id": "dGVybTo3MQ=="
                  },
                  {
                    "id": "dGVybTo3NQ=="
                  }
                ]
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo2Ng==",
              "name": "JavaScript",
              "parentId": "dGVybTo1Mw==",
              "slug": "java-script",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo2OQ==",
              "name": "Laravel",
              "parentId": "dGVybTo1Mw==",
              "slug": "laravel",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo2NQ==",
              "name": "Python",
              "parentId": "dGVybTo1Mw==",
              "slug": "python",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo2Nw==",
              "name": "React",
              "parentId": "dGVybTo1Mw==",
              "slug": "react",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo3MA==",
              "name": "Ruby on Rails",
              "parentId": "dGVybTo1Mw==",
              "slug": "ruby-on-rails",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybToxMTk=",
              "name": "shell",
              "parentId": "dGVybTo1Mw==",
              "slug": "shell",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo1Ng==",
              "name": "Unity",
              "parentId": "dGVybTo0NA==",
              "slug": "unity",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo4OQ==",
              "name": "VBA",
              "parentId": "dGVybTo1Mw==",
              "slug": "vba",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo2NA==",
              "name": "WordPress関連",
              "parentId": "dGVybTo1Mw==",
              "slug": "wordpress",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo3Nw==",
              "name": "おすすめアイテム",
              "parentId": "dGVybTo1",
              "slug": "item-introduction",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo3Ng==",
              "name": "おすすめ技術書",
              "parentId": "dGVybTo1Mw==",
              "slug": "dev-book",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo0NQ==",
              "name": "おもしろコラム",
              "parentId": "dGVybTo1",
              "slug": "column",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo1",
              "name": "その他",
              "parentId": null,
              "slug": "other",
              "children": {
                "nodes": [
                  {
                    "id": "dGVybTo3Nw=="
                  },
                  {
                    "id": "dGVybTo0NQ=="
                  },
                  {
                    "id": "dGVybTo3OA=="
                  }
                ]
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo2Mg==",
              "name": "アセット関連",
              "parentId": "dGVybTo0NA==",
              "slug": "game-assets",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo5OA==",
              "name": "アニメーション",
              "parentId": "dGVybTo0NA==",
              "slug": "%e3%82%a2%e3%83%8b%e3%83%a1%e3%83%bc%e3%82%b7%e3%83%a7%e3%83%b3",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo3Mw==",
              "name": "アプリ開発(Unity以外)",
              "parentId": "dGVybTo1Mw==",
              "slug": "app-dev",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo0Mw==",
              "name": "イラスト作成",
              "parentId": "dGVybTo1NA==",
              "slug": "illust",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybToxMDg=",
              "name": "グラフィックス",
              "parentId": "dGVybTo0NA==",
              "slug": "%e3%82%b0%e3%83%a9%e3%83%95%e3%82%a3%e3%83%83%e3%82%af%e3%82%b9",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybToxNDc=",
              "name": "ゲームAI",
              "parentId": "dGVybTo0NA==",
              "slug": "%e3%82%b2%e3%83%bc%e3%83%a0ai",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo1Mg==",
              "name": "ゲームセンター",
              "parentId": null,
              "slug": "gamecenter",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo1OQ==",
              "name": "ゲーム数学",
              "parentId": "dGVybTo0NA==",
              "slug": "game-math",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo0NA==",
              "name": "ゲーム開発",
              "parentId": null,
              "slug": "game",
              "children": {
                "nodes": [
                  {
                    "id": "dGVybTo0Ng=="
                  },
                  {
                    "id": "dGVybTo1Nw=="
                  },
                  {
                    "id": "dGVybTo1OA=="
                  },
                  {
                    "id": "dGVybTo1Ng=="
                  },
                  {
                    "id": "dGVybTo2Mg=="
                  },
                  {
                    "id": "dGVybTo5OA=="
                  },
                  {
                    "id": "dGVybToxMDg="
                  },
                  {
                    "id": "dGVybToxNDc="
                  },
                  {
                    "id": "dGVybTo1OQ=="
                  },
                  {
                    "id": "dGVybTo2MA=="
                  },
                  {
                    "id": "dGVybTo2MQ=="
                  },
                  {
                    "id": "dGVybTo2Mw=="
                  }
                ]
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo2MA==",
              "name": "サウンド",
              "parentId": "dGVybTo0NA==",
              "slug": "game-sound",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo3Mg==",
              "name": "サーバサイド関連",
              "parentId": "dGVybTo1Mw==",
              "slug": "serverside",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo3NA==",
              "name": "ソフトウェア設計",
              "parentId": "dGVybTo1Mw==",
              "slug": "software-design",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo0OQ==",
              "name": "ツール開発",
              "parentId": "dGVybTo1Mw==",
              "slug": "tool-dev",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo1NA==",
              "name": "デザイン",
              "parentId": null,
              "slug": "design",
              "children": {
                "nodes": [
                  {
                    "id": "dGVybTo0Mw=="
                  }
                ]
              }
            }
          },
          {
            "node": {
              "id": "dGVybToxNTI=",
              "name": "ハードウェア",
              "parentId": "dGVybTo1Mw==",
              "slug": "%e3%83%8f%e3%83%bc%e3%83%89%e3%82%a6%e3%82%a7%e3%82%a2",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo1MQ==",
              "name": "ピアノ",
              "parentId": "dGVybToz",
              "slug": "piano",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo3MQ==",
              "name": "フロントエンド関連",
              "parentId": "dGVybTo1Mw==",
              "slug": "frontend",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo3OA==",
              "name": "マイケルの日常",
              "parentId": "dGVybTo1",
              "slug": "days",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTozNw==",
              "name": "ラーメン日記",
              "parentId": null,
              "slug": "ramen",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo2MQ==",
              "name": "リリース関連",
              "parentId": "dGVybTo0NA==",
              "slug": "game-release",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo2Mw==",
              "name": "制作日記",
              "parentId": "dGVybTo0NA==",
              "slug": "dev-blog",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTozOQ==",
              "name": "四コマ漫画",
              "parentId": null,
              "slug": "comic",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo0MA==",
              "name": "好きな曲カタルコーナー",
              "parentId": "dGVybToz",
              "slug": "favorite",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTox",
              "name": "未分類",
              "parentId": null,
              "slug": "nocategory",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo0MQ==",
              "name": "楽器・機材",
              "parentId": "dGVybToz",
              "slug": "mygear",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo2",
              "name": "都会のエレキベア",
              "parentId": null,
              "slug": "elekibear",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybTo3NQ==",
              "name": "開発手法",
              "parentId": "dGVybTo1Mw==",
              "slug": "dev-method",
              "children": {
                "nodes": []
              }
            }
          },
          {
            "node": {
              "id": "dGVybToz",
              "name": "音楽",
              "parentId": null,
              "slug": "music",
              "children": {
                "nodes": [
                  {
                    "id": "dGVybTo0Mg=="
                  },
                  {
                    "id": "dGVybTo1MQ=="
                  },
                  {
                    "id": "dGVybTo0MA=="
                  },
                  {
                    "id": "dGVybTo0MQ=="
                  }
                ]
              }
            }
          }
        ]
    },
    "extensions": {
      "debug": [
        {
          "type": "DEBUG_LOGS_INACTIVE",
          "message": "GraphQL Debug logging is not active. To see debug logs, GRAPHQL_DEBUG must be enabled."
        }
      ]
    }
  }
`;
