import { create } from "zustand";
import type { User } from "../source/types";
import { countries, type Country } from "typed-countries";

interface UserState {
	countries: Country[];
	userControlled: Partial<User>;
	userUncontrolled: Partial<User>;
	setUserControlled: (newUser: Partial<User>) => void;
	setUserUncontrolled: (newUser: Partial<User>) => void;
}

const initialUser: Partial<User> = {
	name: "John",
};

export const useStore = create<UserState>()((set) => ({
	countries: countries,
	userControlled: initialUser,
	userUncontrolled: initialUser,
	setUserControlled: (newUser: Partial<User>) =>
		set((prev) => ({ userControlled: { ...prev.userControlled, ...newUser } })),
	setUserUncontrolled: (newUser: Partial<User>) =>
		set((prev) => ({
			userUncontrolled: { ...prev.userUncontrolled, ...newUser },
		})),
}));
