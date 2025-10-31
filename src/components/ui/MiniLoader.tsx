import Image from 'next/image';

import { twMerge } from 'tailwind-merge';

interface Props {
	width?: number
	height?: number
	isDark?: boolean
	className?: string
}

//icons 
import LoaderIcon from '../../../public/loader.svg';
import DarkLoaderIcon from '../../../public/dark-loader.svg';

export const MiniLoader = (props: Props) => {

	const {
		width = 30,
		height = 30,
		isDark = false,
		className,
		...rest
	} = props;

	return (
		<Image
			src={isDark ? DarkLoaderIcon : LoaderIcon}
			alt="loader"
			width={width}
			height={height}
			priority
			className={twMerge("max-auto", className)}
			{...rest}
		/>

	)
}