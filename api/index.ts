import axios from "axios";
import { appID } from "@/fotofamExtra.json";

export type AuthHeaders = {
    Authorization: string;
};

export const get = async (url: string, headers: AuthHeaders) => {
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
            // use EAS dashboard and set up env vars for api key + BE url + other shit that may need it
            "x-api-key": "api_123_key",
            Origin: appID,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
};
