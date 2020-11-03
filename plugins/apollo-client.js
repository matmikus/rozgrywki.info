import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-fetch';
import { getUserId } from '@/scripts/getUserId.ts';

export default function (context) {
    return {
        defaultHttpLink: false,
        link: createHttpLink({
            uri: process.env.GRAPHQL_ENDPOINT,
            credentials: 'include',
            fetch: (uri, options) => {
                options.headers['x-hasura-user-id'] = getUserId(context);
                
                return fetch(uri, options);
            }
        })
    };
}
