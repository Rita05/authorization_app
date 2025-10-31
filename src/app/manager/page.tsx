import { Metadata } from "next";


//components
import { ManagerContent } from "./ManagerContent";

export const metadata: Metadata = {
	title: 'Manager content'
}

const ManagerContentPage = () => {
	return (
		<ManagerContent />
	)
}

export default ManagerContentPage;