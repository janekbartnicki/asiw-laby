import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export const useApiCall = () => {
    const navigate = useNavigate();

    const fetchWithAuth = useCallback(async (
        url: string,
        token: string | null,
        options: RequestInit = {}
    ): Promise<Response> => {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Authorization': `Bearer ${token}`,
                ...options.headers,
            },
        });

        if (response.status === 401) {
            navigate('/login', { replace: true });
            throw new Error('Unauthorized');
        }

        return response;
    }, [navigate]);

    return { fetchWithAuth };
};
