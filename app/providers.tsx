'use client';

import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from '@/lib/auth-context';
import client from '@/lib/apollo-client';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ApolloProvider client={client}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ApolloProvider>
    );
} 