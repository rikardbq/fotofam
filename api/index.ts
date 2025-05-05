import axios from "axios";

export type AuthHeaders = {
    Authorization: string;
};

export const get = async (url: string, headers: AuthHeaders) => {
    // setup requests with some basic stuff for auth and similar
    return await axios.get(url, {
        headers: {
            ...headers,
            something2: "asdf",
        },
    });
};

export const post = async (url: string, body: any, headers?: AuthHeaders) => {
    return await axios.post(url, body, {
        headers: {
            ...headers,
            "x-api-key": "api_123_key", // use EAS dashboard and set up env vars for api key + BE url + other shit that may need it
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
};
