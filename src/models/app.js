import db from '../db'

export async function getSingleAppById(appId) {
  const app = await getAppMeta().where('AppId', appId)
  return app[0]
}

export async function getAppsByIds(appIds) {
  const apps = getAppMeta().whereIn('AppId', appIds)
  return apps
}

function getAppMeta() {
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
