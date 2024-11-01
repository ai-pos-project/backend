import { User } from "../../Database/Entities/user.js";

export const managerRepo = {
    findByPhone: async (phone: string): Promise<User | null> => {
        try {
            const user = await User.findOne({ where: { phone: phone } });
            return user;
        } catch (error) {
            throw error;
        }
    },

}