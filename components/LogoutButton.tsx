'use client';
import { useAuthContext } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
	const { logout, setAuthenticated } = useAuthContext();
	const router = useRouter();

	const handleLogout = () => {
		logout();
		setAuthenticated(false);
		router.push('/login');
	};

	return <button onClick={handleLogout}>Logout</button>;
}
