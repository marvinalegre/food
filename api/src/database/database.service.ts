import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import Database from "better-sqlite3";
import { join } from "node:path";

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  db: Database.Database;

  onModuleInit() {
    this.db = new Database(join(process.cwd(), "food.db"));
    this.db.exec(`
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
      );
    `);
  }

  onModuleDestroy() {
    this.db.close();
  }
}
