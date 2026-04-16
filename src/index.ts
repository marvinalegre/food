import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// health check
app.get("/message", (c) => {
  return c.text("Hello Hono + D1!");
});

// get all foods (sorted by calorie density)
app.get("/foods", async (c) => {
  const { results } = await c.env.DB.prepare(
    `
      SELECT
        id,
        description,
        serving_size,
        fat_g,
        calories,
        carbohydrate_g,
        protein_g,
        cholesterol_mg,
        weight_g,
        saturated_fat_g,
        calorie_density
      FROM foods
      ORDER BY calorie_density DESC
    `,
  ).all();

  return c.json(results);
});

export default app;
