import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
    token: string | null;
    isLoading: boolean;
    login: (phone: string) => Promise<void>;
    verifyOtp: (otp: string) => Promise<boolean>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
    token: null,
    isLoading: true,
    login: async () => { },
    verifyOtp: async () => false,
    logout: async () => { },
    isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => { // Fixed duplicate function name issue by using the one declared here
        try {
            const storedToken = await SecureStore.getItemAsync('authToken');
            setToken(storedToken);
        } catch (e) {
            console.error('Failed to load auth token', e);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (phone: string) => {
        // Mock sending OTP
        console.log(`Sending OTP to ${phone}`);
    };

    const verifyOtp = async (otp: string) => {
        // Mock verifying OTP
        if (otp === '1234') { // Mock OTP
            const mockToken = 'dummy-auth-token-' + Date.now();
            await SecureStore.setItemAsync('authToken', mockToken);
            setToken(mockToken);
            return true;
        }
        return false;
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync('authToken');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{
            token,
            isLoading,
            login,
            verifyOtp,
            logout,
            isAuthenticated: !!token
        }}>
            {children}
        </AuthContext.Provider>
    );
};
