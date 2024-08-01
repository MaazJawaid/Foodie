import { z } from 'zod';

const FoodItemSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(0),
  reviews: z.number().int().min(0),
  description: z.string().min(1),
  type: z.string().min(1),
  onSale: z.boolean()
});

export default FoodItemSchema;
