// file for generic database queries
import fs from 'node:fs/promises'

const DB_PATH = new URL('../db.json', import.meta.url).pathname.substring(1,)

//reads the db.json file and parses it into a JavaScript object
export const getDB = async () => {
  const db = await fs.readFile(DB_PATH, 'utf-8')
  return JSON.parse(db)
}

//writes a given JavaScript object into the db.json file
export const saveDB = async (db) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2))
  return db
}

//takes a JavaScript object representing a note and adds it to the notes array in the db.json file
export const insert = async (data) => {
  const db = await getDB()
  db.notes.push(data)
  await saveDB(db)
  return data 
}
