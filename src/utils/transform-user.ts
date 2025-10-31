//types
import { TProtectUserData as TUserProfile, UserRole } from "@/types/auth.types"

export type IUserDataTransformed = TUserProfile & {
	isLoggedIn: boolean
	isAdmin: boolean
	isManager: boolean
	isPremium: boolean
}

export const transformUser = (profile: TUserProfile): IUserDataTransformed | null => {
	return {
		...profile,
		isLoggedIn: true,
		isAdmin: profile.rights.includes(UserRole.ADMIN),
		isManager: profile.rights.includes(UserRole.MANAGER),
		isPremium: profile.rights.includes(UserRole.PREMIUM)
	}
}