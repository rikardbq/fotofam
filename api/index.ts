import axios from "axios";

type Headers = {
    "Bearer": string,
    something: string,
}

export const get = async (url: string, headers: Headers) => {
    // setup requests with some basic stuff for auth and similar
    return await axios.get(url, {
        headers: {
            ...headers,
            something2: "asdf"
        }
    });
}

export const post = (url: string, headers: Headers) => {

}