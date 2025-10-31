import { ReactNode } from "react"

interface Props {
	children: ReactNode
	heading: string
}

export const AuthPageWrapper = (props: Props) => {
	const { children, heading } = props;
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="p-8 rounded-lg" style={{ boxShadow: "0 1px 3px -2px rgba(0, 0, 0, .2), 0 1px 1px rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12)" }}>
				<h2 className="font-semibold mb-4">{heading}</h2>
				{children}
			</div>
		</div >
	)
}

