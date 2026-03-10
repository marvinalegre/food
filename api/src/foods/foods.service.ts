import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class FoodsService {
  constructor(private databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.db
      .prepare(
        "select *, calories * 1.0 / weight_g AS calorie_density from foods order by calorie_density desc",
      )
      .all();
  }
}
