import { Metadata } from "next";


export const metadata: Metadata = {
	title: 'Plans',
	description: 'Plans...'
}

//Перебрасываем пользователя сюда, если у него нет premium подписки той же 
const PlansPage = () => {
	return (
		<div>
			List of plans
		</div>
	)
}

export default PlansPage;