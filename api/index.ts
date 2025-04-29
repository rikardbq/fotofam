import axios from "axios";

type Headers = {
    Bearer: string;
    something: string;
};

export const get = async (url: string, headers: Headers) => {
    // setup requests with some basic stuff for auth and similar
    return await axios.get(url, {
        headers: {
            ...headers,
            something2: "asdf",
        },
    });
};

export const post = async (url: string, body: any, headers?: Headers) => {
    // console.log(body);
    
    return await axios.post(url, body, {
        headers: {
            ...headers,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
};
