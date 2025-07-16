import dbConnect from "@/lib/mongodb";
import { SubscriptionPlan } from "./subscriptions.types";
import { Subscription } from "@/lib/models/Subscription.model";

export const createSubscriptionPlan = async (data: SubscriptionPlan) => {
    try {
        await dbConnect();
        const subscriptionPlan = await Subscription.create(data);
        if (!subscriptionPlan) {
            throw new Error("Failed to create subscription plan");
        }
        return subscriptionPlan;
    } catch (error) {
        throw new Error("Failed to create subscription plan", { cause: error });
    }
}

export const getSubscriptionPlans = async () => {
    try {
        await dbConnect();
        const subscriptionPlans = await Subscription.find({});
        if (!subscriptionPlans) {
            throw new Error("No subscription plans found");
        }
        return subscriptionPlans;
    } catch (error) {
        throw new Error("Failed to fetch subscription plans", { cause: error });
    }
}