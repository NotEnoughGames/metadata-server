import db from '../db'
import _ from 'lodash'

export async function getSingleAppById(appId) {
  const app = await buildAppInfoQuery().where('AppId', appId)
  await bulkFetchAppMeta(app)
  return app[0]
}

export async function getAppsByIds(appIds, fetchMeta = false) {
  const apps = await buildAppInfoQuery().whereIn('AppId', appIds)
  if (fetchMeta) {
    await bulkFetchAppMeta(apps)
  }
  return apps
}

function buildAppInfoQuery() {
  return db
    .select(
      'Apps.AppID',
      'Apps.Name',
      'Apps.AppType',
      'AppsTypes.DisplayName as AppTypeDisplayName'
    )
    .from('Apps')
    .join('AppsTypes', 'Apps.AppType', 'AppsTypes.AppType')
}

function buildAppMetaQuery() {
  return db
    .select(
      'Apps.AppID',
      'KeyNames.Name as MetaKey',
      'AppsInfo.Value as MetaValue'
    )
    .from('Apps')
    .join('AppsInfo', 'Apps.AppID', 'AppsInfo.AppID')
    .join('KeyNames', 'AppsInfo.Key', 'KeyNames.ID')
    .whereIn('KeyNames.Name', [
      'common_store_tags',
      'common_icon',
      'common_logo',
      'common_logo_small',
      'common_metacritic_fullurl',
      'common_metacritic_score',
      'extended_developer',
      'extended_publisher',
      'extended_homepage',
      'extended_developer_url'
    ])
}

async function bulkFetchAppMeta(apps) {
  if (!apps.length) return apps
  const appIds = []
  const appIdIndexMap = new Map()
  for (const key in apps) {
    const app = apps[key]
    app.Info = {}
    appIds.push(app.AppID)
    appIdIndexMap.set(app.AppID, key)
  }
  const metas = await buildAppMetaQuery().whereIn('Apps.AppID', appIds)
  for (const meta of metas) {
    const index = appIdIndexMap.get(meta.AppID)
    if (!index) continue
    let value = meta.MetaValue
    if (value.startsWith('{')) {
      try {
        value = JSON.parse(value)
      } catch (e) {}
    }
    const key = _.upperFirst(_.camelCase(meta.MetaKey))
    if (meta.MetaKey === 'common_store_tags') {
      apps[index].Info[key] = Object.values(value).map(e => parseInt(e))
    } else {
      apps[index].Info[key] = value
    }
  }
  return apps
}
