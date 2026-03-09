import Database from "better-sqlite3";
import readline from "readline";
import fs from "fs";

const db = new Database("./nutrition.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS foods (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    description     TEXT    NOT NULL,
    serving_size    TEXT    NOT NULL,
    fat_g           REAL,
    calories        INTEGER,
    carbohydrate_g  REAL,
    protein_g       REAL,
    cholesterol_mg  REAL,
    weight_g        REAL,
    saturated_fat_g REAL
  )
`);

const insert = db.prepare(`
  INSERT INTO foods (
    description,
    serving_size,
    fat_g,
    calories,
    carbohydrate_g,
    protein_g,
    cholesterol_mg,
    weight_g,
    saturated_fat_g
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
const insertMany = db.transaction((lines) => {
  for (const line of lines) {
    const values = line.split("|");
    insert.run(...values);
  }
});

const rl = readline.createInterface({
  input: fs.createReadStream("./data/nutrition.txt"),
  crlfDelay: Infinity,
});

const BATCH_SIZE = 100;
let batch: string[] = [];

for await (const line of rl) {
  if (/^Description|^\s/.test(line)) continue;
  if (line.length > 100) {
    const description = line.slice(0, 30).trim();
    const servingSize = line.slice(30, 38).trim();
    const rest = line.slice(38).trim().split(/\s+/);
    batch.push([description, servingSize, ...rest].join("|"));
  }
  if (batch.length >= BATCH_SIZE) {
    insertMany(batch);
    batch = [];
  }
}

if (batch.length > 0) insertMany(batch);

db.close();
