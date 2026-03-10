import { Module } from "@nestjs/common";
import { FoodsController } from "./foods.controller";
import { FoodsService } from "./foods.service";
import { DatabaseModule } from "src/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [FoodsController],
  providers: [FoodsService],
})
export class FoodsModule {}
