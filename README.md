# metadata-server

NotEnoughGames 的 Steam 库元数据服务。它连接 SteamDatabase 的数据库，并提供批量查询接口，供用户获取 App 对应的类型和标题，以用于筛选。

## 部署

```bash
docker build -t metadata-server
docker run -v config.js:/app/config.js --rm metadata-server
```