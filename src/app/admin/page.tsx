import { Metadata } from "next";

//components
import { Users } from "./Users";

export const metadata: Metadata = {
	title: 'Admin'
}

const UsersContentPage = () => {
	return (
		<Users />
	)
}

export default UsersContentPage;

