import { useQuery } from "@tanstack/react-query";

//api
import userService from "@/services/user.service";
import authService from "@/services/auth/auth.service";

//utils
import { IUserDataTransformed, transformUser } from "@/utils/transform-user";


export const useProfile = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		refetchInterval: 180000 // переобновление данных, если считаем их устаревшими, чтобы был обновлен профиль

	});


	//Если получаем пустые данные, то делаем дополнительную проверку на переобновление токена и если не увидели профиль
	const {
		isSuccess,
		data: dataTokens,
		refetch
	} = useQuery({
		queryKey: ['new tokens'],
		queryFn: () => authService.getNewTokens(),
		enabled: !data?.data
	});

	const profile = data?.data;

	const transformedUser = profile ? transformUser(profile) : null;

	return {
		isLoading,
		refetch,
		user: {
			...profile,
			...transformedUser
		}
	}
}

