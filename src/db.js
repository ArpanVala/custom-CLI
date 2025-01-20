import fs from 'node:fs/promises'

const DB_PATH = new URL('../db.json', import.meta.url).pathname.substring(1,)

// retriving Database
export const getDB = async () => {
  const db = await fs.readFile(DB_PATH, 'utf-8')
  return JSON.parse(db)
}

//saving database
export const saveDB = async (db) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2))
  return db
}

//inserting into database
export const insert = async (data) => {
  const db = await getDB()
  db.notes.push(data)
  await saveDB(db)
  return data 
}