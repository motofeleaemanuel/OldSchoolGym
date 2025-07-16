import { createSubscriptionPlan, getSubscriptionPlans } from '@/actions/subscriptions.actions';
import { SubscriptionPlan } from '@/actions/subscriptions.types';
import { SubscriptionPlanSchema } from '@/lib/schemas/subscriptions.schema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const subscriptionPlans: SubscriptionPlan[] = await getSubscriptionPlans();
        return NextResponse.json(subscriptionPlans, { status: 200 });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('Error fetching subscription plans:', errorMessage);
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    const parseResult = SubscriptionPlanSchema.safeParse(data);

    if (!parseResult.success) {
        return NextResponse.json(
            { errors: parseResult.error.issues },
            { status: 400 }
        );
    }

    try {
        const newSubscriptionPlan = await createSubscriptionPlan(parseResult.data);
        return NextResponse.json(newSubscriptionPlan, { status: 201 });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }


}