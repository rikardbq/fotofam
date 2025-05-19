import Hex from "crypto-js/enc-hex";
import HmacSha256 from "crypto-js/hmac-sha256";

import { AuthHeaders } from "@/api";

export type TokenClaims = {
    iss: string;
    aud: string;
    iat: number;
    exp: number;
    "x-uname": string;
    "x-aid": string;
};

export const createAuthHeader = (token: string): AuthHeaders => ({
    Authorization: `Bearer ${token}`,
});

export const generateSignature = async (input: string, secret: string) =>
    Hex.stringify(HmacSha256(input, secret));

export const encodePassword = (password: string) => {
    return password;
};
