// TinaCMS database connection handler using Apollo Client
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Function to execute GraphQL queries against the TinaCMS database
export async function databaseRequest({ query, variables, database }) {
    try {
        console.log('Database request received:', { query: query.substring(0, 100) + '...' });

        // If a direct database instance is provided, use it
        if (database && typeof database.query === 'function') {
            console.log('Using direct database instance');
            const result = await database.query({
                query,
                variables
            });

            return {
                data: result.data || null,
                errors: result.errors || null
            };
        }

        // Otherwise, use Apollo Client to make a GraphQL request
        // This is useful for local development or when using TinaCMS in client mode
        console.log('Using Apollo Client');
        const client = new ApolloClient({
            uri: '/api/tina/gql',
            cache: new InMemoryCache()
        });

        const result = await client.query({
            query: gql`${query}`,
            variables
        });

        return {
            data: result.data || null,
            errors: result.errors || null
        };
    } catch (error) {
        console.error('Database request error:', error);

        return {
            data: null,
            errors: [
                {
                    message: error.message || 'Database request failed',
                    path: error.path,
                    locations: error.locations
                }
            ]
        };
    }
}