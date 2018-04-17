import db from '../db'

export async function fetchStoreUpdateQueue(type) {
  let h = db.select('ID', 'Type').from('StoreUpdateQueue')
  if (type) {
    h.where('Type', type)
  }
  const result = await h.limit(100)
  return result
}

export async function removeFromStoreUpdateQueue(idTypeList) {
  const types = new Map()
  for (const idType of idTypeList) {
    const current = types.get(idType.type) || new Set()
    current.add(parseInt(idType.id))
    types.set(idType.type, current)
  }
  await db.transaction(async trx => {
    for (const entry of types) {
      await trx('StoreUpdateQueue')
        .whereIn('Id', [...entry[1]])
        .andWhere('Type', entry[0])
        .delete()
    }
  })
}
