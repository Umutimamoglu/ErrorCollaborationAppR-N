import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IAuthenticatedUser } from "../types";

interface IUserGlobalStore {
    user: IAuthenticatedUser | null;
    updateUser: (user: IAuthenticatedUser | null) => void;
}

const useUserGlobalStore = create<IUserGlobalStore>()(
    persist(
        (set) => ({
            user: null,
            updateUser: (user) => {
                set({ user });
            },
        }),
        {
            name: "ErrorCol-store",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useUserGlobalStore;