import { deleteSubscriptionPlan, getSubscriptionPlanById, updateSubscriptionPlan } from "@/actions/subscriptions.actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
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

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
     const { id } = await context.params;
     try{
            if (!id) {
                return NextResponse.json(
                    { error: "Missing subscription plan id" },
                    { status: 400 }
                );
            }
            const data = await req.json();
            const updatedPlan = await updateSubscriptionPlan(id, data);
            return NextResponse.json(updatedPlan, { status: 200 });
     }catch(error: unknown) {
         const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
         return NextResponse.json(
             { error: errorMessage },
             { status: 500 }
         );
     }
};

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    try {
        if (!id) {
            return NextResponse.json(
                { error: "Missing subscription plan id" },
                { status: 400 }
            );
        }
        const deletedPlan = await deleteSubscriptionPlan(id);
        return NextResponse.json(deletedPlan, { status: 200 });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}