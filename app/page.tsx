'use client';
import { useAuthContext } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
	const router = useRouter();
	const { isAuthenticated } = useAuthContext();

	useEffect(() => {
		if (isAuthenticated === false) {
			router.push('/login');
		} else if (isAuthenticated === true) {
			router.push('/search');
		}
	}, [isAuthenticated, router]);
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"></div>
	);
}
