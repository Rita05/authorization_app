'use client'

import { PropsWithChildren, useState } from "react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LazyMotion, domAnimation } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export function Providers({ children }: PropsWithChildren) {
	const [client] = useState(new QueryClient());

	return (
		<QueryClientProvider client={client}>
			<LazyMotion features={domAnimation}>{children}</LazyMotion>
			<Toaster />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}