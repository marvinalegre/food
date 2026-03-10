import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Food = {
  id: number
  description: string
  serving_size: string
  fat_g: number
  calories: number
  carbohydrate_g: number
  protein_g: number
  cholesterol_mg: number
  weight_g: number
  saturated_fat_g: number
  calorie_density: number
}

async function getFoods(): Promise<Food[]> {
  const res = await fetch("http://localhost:4000/foods", {
    cache: "no-store",
  })
  return res.json()
}

export default async function Page() {
  const foods = await getFoods()

  return (
    <div className="p-6">
      <h1 className="mb-4 text-lg font-medium">
        Foods (sorted by calorie density)
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Serving Size</TableHead>
            <TableHead>Protein (g)</TableHead>
            <TableHead>Carbs (g)</TableHead>
            <TableHead>Fat (g)</TableHead>
            <TableHead>Sat. Fat (g)</TableHead>
            <TableHead>Cholesterol (mg)</TableHead>
            <TableHead>Calories</TableHead>
            <TableHead>Weight (g)</TableHead>
            <TableHead>Cal Density (cal/g)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {foods.map((food) => (
            <TableRow key={food.id}>
              <TableCell>{food.description}</TableCell>
              <TableCell>{food.serving_size}</TableCell>
              <TableCell>{food.protein_g}</TableCell>
              <TableCell>{food.carbohydrate_g}</TableCell>
              <TableCell>{food.fat_g}</TableCell>
              <TableCell>{food.saturated_fat_g}</TableCell>
              <TableCell>{food.cholesterol_mg}</TableCell>
              <TableCell>{food.calories}</TableCell>
              <TableCell>{food.weight_g}</TableCell>
              <TableCell>{food.calorie_density.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <footer className="p-6">
        source: https://www.invive.com/calorie.html
      </footer>
    </div>
  )
}
