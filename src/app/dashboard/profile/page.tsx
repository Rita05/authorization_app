import { Metadata } from "next";

//components
import { ProfileInfo } from "./ProfileInfo";

export const metadata: Metadata = {
	title: 'Profile'
}

const ProfilePage = () => {
	return (
		<ProfileInfo />
	)
}

export default ProfilePage;