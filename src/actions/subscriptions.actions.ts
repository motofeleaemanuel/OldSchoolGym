import dbConnect from "@/lib/mongodb";
import { SubscriptionPlan } from "./subscriptions.types";
import { Subscription } from "@/lib/models/Subscription";

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

export const getSubscriptionPlanById = async (id: string) => {
    try {
        await dbConnect();
        const subscriptionPlan = await Subscription.findById(id);
        if (!subscriptionPlan) {
            throw new Error(`Subscription plan with id ${id} not found`);
        }
        return subscriptionPlan;
    } catch (error) {
        throw new Error("Failed to fetch subscription plan", { cause: error });
    }
}

export const updateSubscriptionPlan = async (id: string, data: Partial<SubscriptionPlan>) => {
    try {
        await dbConnect();
        const updatedPlan = await Subscription.findByIdAndUpdate(id, data, { new: true });
        if (!updatedPlan) {
            throw new Error(`Subscription plan with id ${id} not found`);
        }
        return updatedPlan;
    } catch (error) {
        throw new Error("Failed to update subscription plan", { cause: error });
    }
}

export const deleteSubscriptionPlan = async (id: string) => {
    try {
        await dbConnect();
        const deletedPlan = await Subscription.findByIdAndDelete(id);
        if (!deletedPlan) {
            throw new Error(`Subscription plan with id ${id} not found`);
        }
        return deletedPlan;
    } catch (error) {
        throw new Error("Failed to delete subscription plan", { cause: error });
    }
}