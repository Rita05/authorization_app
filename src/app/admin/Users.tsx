'use client'
import { useQuery } from "@tanstack/react-query"

//components
import { MiniLoader } from "@/components/ui/MiniLoader";

//api
import userService from "@/services/user.service";

export const Users = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['users-list'],
		queryFn: () => userService.getUsersList()
	})

	return (
		<div className="flex flex-col">
			<h1>
				Page Users
			</h1>
			{isLoading ? (
				<MiniLoader
					width={100}
					height={100}
					isDark
					className="min-h-screen flex self-center justify-center"
				/>
			) : (
				data?.data.length
					? (
						data.data.map((user) => <div key={user.id}>{user.email}</div>)
					)
					:
					(
						<p>{'Not Found'}</p>
					)
			)}
		</div>
	)
}