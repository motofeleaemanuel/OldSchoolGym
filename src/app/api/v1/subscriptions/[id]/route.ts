import { getSubscriptionPlanById } from "@/actions/subscriptions.actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    // 1️⃣ await the params promise
    const { id } = await context.params;
    try {
        if (!id) {
            return NextResponse.json(
                { error: "Missing subscription plan id" },
                { status: 400 }
            );
        }
        const subscriptionPlan = await getSubscriptionPlanById(id);
        return NextResponse.json(subscriptionPlan, { status: 200 });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('Error fetching subscription plans:', errorMessage);
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}