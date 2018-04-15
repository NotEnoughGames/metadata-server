# API 参考

以下罗列 Metadata Server 提供的 API 参考。

NotEnoughGames 在 https://meta.notengouh.games 下维护了一个公开的服务器，并允许所有用户匿名地访问。
然而，为了使我们的服务器容易维持，我们依然强烈建议您自行搭建 SteamDatabaseBackend 和 Metadata Server。

## GET /app/:appid

通过 appid 获取 app 类型和名称。

```bash
$ curl https://meta.notenough.games/app/7
{
  "AppID": 7,
  "Name": "Steam Client",
  "AppType": 9,
  "AppTypeDisplayName": "Config"
}
```

## POST /apps/

通过 appid 列表获取 app 类型和名称。请求体为逗号分割的 appid 字符串。

注意：

* 单次请求有效 ID 不得超过 100 个。
* 请将 `Content-Type` 头设为 `text/plain`。

```bash
$ curl https://meta.notenough.games/apps -XPOST -d'7,10,5000' -H'Content-Type: text/plain'
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
