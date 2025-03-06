'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
	isAuthenticated: boolean;
	setAuthenticated: (auth: boolean) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const setAuthenticated = (auth: boolean) => {
		setIsAuthenticated(auth);
	};

	const logout = async () => {
		await axios.post('https://frontend-take-home-service.fetch.com/auth/logout', {}, { withCredentials: true });
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, setAuthenticated, logout }}>{children}</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	const state = useContext(AuthContext);
	if (state === undefined) {
		throw new Error('useAuth must be used within an AuthContextProvider');
	}
	return state;
};
