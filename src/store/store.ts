import { create } from "zustand";
import type { User } from "../source/types";

interface UserState {
	user: Partial<User>;
	setUser: (newUser: Partial<User>) => void;
}

const initialUser: Partial<User> = {
	name: "John",
};

export const useUserStore = create<UserState>()((set) => ({
	user: initialUser,
	setUser: (newUser: Partial<User>) =>
		set(() => ({
			user: newUser,
		})),
}));
