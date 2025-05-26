import axios from "axios";
import { appID } from "@/fotofamExtra.json";

// get all the info from env vars
const conf = {
    url: "http://192.168.0.22:8082",
    headers: {
        "x-api-key": "api_123_key",
        origin: appID,
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

export type AuthHeaders = {
    Authorization: string;
};

export const get = async (endpoint: string, headers: AuthHeaders) => {
    return await axios.get(`${conf.url}/${endpoint}`, {
        headers: {
            ...headers,
            ...conf.headers,
        },
    });
};

export const post = async (
    endpoint: string,
    body: any,
    headers?: AuthHeaders
) => {
    return await axios.post(`${conf.url}/${endpoint}`, body, {
        headers: {
            ...headers,
            ...conf.headers,
        },
    });
};
