'use client'

import { useQuery } from "@tanstack/react-query";

//api
import userService from "@/services/user.service";
import { MiniLoader } from "@/components/ui/MiniLoader";

export const ManagerContent = () => {

	const { data, isLoading } = useQuery({
		queryKey: ['manager-content'],
		queryFn: () => userService.getManagerContent()
	})
	return (
		<div className="flex flex-col">
			<h1>
				Page only for Managers
			</h1>
			{isLoading ? (
				<MiniLoader
					width={100}
					height={100}
					isDark
					className="min-h-screen flex self-center justify-center"
				/>
			) : (
				<p>{data?.data.text || 'notFound'}</p>
			)}
		</div>
	)
}