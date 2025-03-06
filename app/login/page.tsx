'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/auth-context';
import '../../styles/Login.css';

export default function LoginPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const { setAuthenticated } = useAuthContext();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		try {
			const response = await axios.post(
				'https://frontend-take-home-service.fetch.com/auth/login',
				{ name, email },
				{ withCredentials: true }
			);
			if (response.status === 200) {
				setAuthenticated(true);
			}
			router.push('/search');
		} catch (err) {
			console.error(err);
			setError('Login failed. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<div className="auth-form">
				<h1>Sign in</h1>
				<form onSubmit={handleLogin}>
					<div>
						<label hidden>Name</label>
						<input
							id="name"
							type="text"
							value={name}
							onChange={e => setName(e.target.value)}
							required
							placeholder="Name"
							autoComplete="name"
						/>
					</div>
					<div>
						<label hidden>Email</label>
						<input
							type="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
							placeholder="Email"
							autoComplete="email"
						/>
					</div>
					<div className="auth-form-footer">
						<button type="submit" disabled={isLoading}>
							{isLoading ? 'Signing in...' : 'Sign in'}
						</button>
					</div>
				</form>
				{error && <p className="error-message">{error}</p>}
			</div>
		</div>
	);
}
