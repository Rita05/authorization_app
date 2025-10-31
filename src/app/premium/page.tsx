import { Metadata } from "next";


//components
import { PremiumContent } from "./PremiumContent";

export const metadata: Metadata = {
	title: 'Premium'
}

const PremiumContentPage = () => {
	return (
		<PremiumContent />
	)
}

export default PremiumContentPage;

