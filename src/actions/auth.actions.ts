"use server"
import User from "@/lib/models/User";
import dbConnect from "@/lib/mongodb";
import bcrypt from "bcryptjs";


interface RegisterValues {
    email: string;
    password: string;
    name: string;
}

export const register = async (values: RegisterValues) => {
    const { email, password, name } = values;
    try {
        await dbConnect();
        const userFound = await User.findOne({ email });
        if(userFound){
            return {
                success: false,
                error: 'Email already exists!'
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          name,
          email,
          password: hashedPassword,
        });
        const savedUser = await user.save();
        return {
            success: true,
            user: savedUser
        };
    }catch(e){
        console.error("Error registering user:", e);
        return {
            success: false,
            error: 'Registration failed. Please try again later.'
        };
    }
}