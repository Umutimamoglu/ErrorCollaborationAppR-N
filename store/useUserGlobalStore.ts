import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IAuthenticatedUser } from "../types";

interface IUserGlobalStore {
    user: IAuthenticatedUser | null;
    favoriteErrorIds: string[]; // Add this line
    updateUser: (user: IAuthenticatedUser | null) => void;
    addFavoriteErrorId: (id: string) => void; // Add this line
    removeFavoriteErrorId: (id: string) => void; // Add this line
}

const useUserGlobalStore = create<IUserGlobalStore>()(
    persist(
        (set) => ({
            user: null,
            favoriteErrorIds: [], // Initialize as empty array
            updateUser: (user) => {
                console.log("Updating user in global store:", user);
                set({ user });
            },
            addFavoriteErrorId: (id) => {
                set((state) => ({
                    favoriteErrorIds: [...state.favoriteErrorIds, id]
                }));
            },
            removeFavoriteErrorId: (id) => {
                set((state) => ({
                    favoriteErrorIds: state.favoriteErrorIds.filter(favId => favId !== id)
                }));
            }
        }),
        {
            name: "ErrorCol-store",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useUserGlobalStore;
