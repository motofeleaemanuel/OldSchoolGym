import { z } from 'zod';

export const SubscriptionPlanSchema = z
  .object({
    _id: z.string().optional(),
    name: z.string(),
    details: z.array(z.string()),
    price: z.number(),
    currency: z.literal('RON'),
  })
  .strict();

export type SubscriptionPlan = z.infer<typeof SubscriptionPlanSchema>;