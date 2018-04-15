# API 参考

以下罗列 Metadata Server 提供的 API 参考。

NotEnoughGames 在 https://meta.notengouh.games 下维护了一个公开的服务器，并允许所有用户匿名地访问。
然而，为了使我们的服务器容易维持，我们依然强烈建议您自行搭建 SteamDatabaseBackend 和 Metadata Server。

## GET /app/:appid

通过 appid 获取 app 类型和名称。

### 示例

```bash
$ curl https://meta.notenough.games/app/7
```

```json
{
  "AppID": 10,
  "Name": "Counter-Strike",
  "AppType": 1,
  "AppTypeDisplayName": "game",
  "Info": {
    "CommonIcon": "6b0312cda02f5f777efa2f3318c307ff9acafbb5",
    "CommonLogo": "af890f848dd606ac2fd4415de3c3f5e7a66fcb9f",
    "CommonLogoSmall": "dc97d7c8ae3a417cbb09fed1dcfb3204b7a2766b",
    "CommonMetacriticFullurl": "http://www.metacritic.com/game/pc/counter-strike?ftag=MCD-06-10aaa1f",
    "CommonMetacriticScore": "88",
    "CommonStoreTags": [
      19,
      1663,
      3859,
      1774,
      1693,
      5711,
      3878,
      3839,
      1708,
      6691,
      5055,
      1775,
      4168,
      9,
      5154,
      1662,
      4376,
      7743,
      1688,
      1645
    ],
    "ExtendedDeveloper": "Valve",
    "ExtendedDeveloperUrl": "http://www.valvesoftware.com/",
    "ExtendedHomepage": "http://www.counter-strike.net/",
    "ExtendedPublisher": "Valve"
  }
}
```

## POST /apps/

通过 appid 列表获取 app 类型和名称。

### 请求体

请求体为逗号分割的 appid 字符串。

### 参数

* `extend`: 为 1 则返回游戏扩展数据，包括图标、tags、发布商等；为 0 则仅返回类型、名字

### 注意

* 单次请求有效 ID 不得超过 100 个。
* 请将 `Content-Type` 头设为 `text/plain`。

### 示例

```bash
$ curl https://meta.notenough.games/apps -XPOST -d'7,10,5000' -H'Content-Type: text/plain'
```

```json
[
  {
    "AppID": 7,
    "Name": "Steam Client",
    "AppType": 9,
    "AppTypeDisplayName": "Config"
  },
  {
    "AppID": 10,
    "Name": "Counter-Strike",
    "AppType": 1,
    "AppTypeDisplayName": "Game"
  },
  {
    "AppID": 5000,
    "Name": "Painkiller Overdose Teaser",
    "AppType": 8,
    "AppTypeDisplayName": "Legacy Media"
  }
]
```

```bash
$ curl 'https://meta.notenough.games/apps?extend=1' -XPOST -d'7,480,10' -H'Content-Type: text/plain'
```

```json
[
  {
    "AppID": 7,
    "Name": "Steam Client",
    "AppType": 3,
    "AppTypeDisplayName": "Config",
    "Info": {}
  },
  {
    "AppID": 10,
    "Name": "Counter-Strike",
    "AppType": 1,
    "AppTypeDisplayName": "game",
    "Info": {
      "CommonIcon": "6b0312cda02f5f777efa2f3318c307ff9acafbb5",
      "CommonLogo": "af890f848dd606ac2fd4415de3c3f5e7a66fcb9f",
      "CommonLogoSmall": "dc97d7c8ae3a417cbb09fed1dcfb3204b7a2766b",
      "CommonStoreTags": [
        19,
        1663,
        3859,
        1774,
        1693,
        5711,
        3878,
        3839,
        1708,
        6691,
        5055,
        1775,
        4168,
        9,
        5154,
        1662,
        4376,
        7743,
        1688,
        1645
      ],
      "ExtendedDeveloper": "Valve",
      "ExtendedHomepage": "http://www.counter-strike.net/",
      "ExtendedDeveloperUrl": "http://www.valvesoftware.com/",
      "ExtendedPublisher": "Valve",
      "CommonMetacriticScore": "88",
      "CommonMetacriticFullurl": "http://www.metacritic.com/game/pc/counter-strike?ftag=MCD-06-10aaa1f"
    }
  },
  {
    "AppID": 480,
    "Name": "Spacewar",
    "AppType": 1,
    "AppTypeDisplayName": "game",
    "Info": {
      "ExtendedDeveloper": "Valve",
      "ExtendedPublisher": "Telltale Games"
    }
  }
]
```