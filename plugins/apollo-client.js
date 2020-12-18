import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-fetch';
import { getUserId, getUpdateToken } from '@/scripts/getContextData.ts';

export default function (context) {
    return {
        defaultHttpLink: false,
        link: createHttpLink({
            uri: process.env.GRAPHQL_ENDPOINT,
            credentials: 'include',
            fetch: (uri, options) => {
                const userId = getUserId(context);
                if (userId) {
                    options.headers['x-hasura-user-id'] = userId;
                }
                
                options.headers['x-hasura-update-token'] = getUpdateToken(context);
                
                return fetch(uri, options);
            }
        })
    };
}
