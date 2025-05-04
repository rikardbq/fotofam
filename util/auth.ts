import { Buffer } from "buffer";

const generateCharFromCodeRange = (min: number = 33, max: number = 126) => {
    let char = String.fromCharCode(
        Math.floor(Math.random() * (max - min + 1) + min)
    );

    return char;
};

const splicePassword = (password: string) => {
    const splicedString: any[] = [];

    let j = 0;
    for (let i = 0; i < password.length * 2; i += 2) {
        const idx = i > 0 ? i - j : i;

        splicedString[i] = password[idx];
        splicedString[i + 1] = generateCharFromCodeRange();

        j++;
    }

    return splicedString.join("");
};

export const encodePassword = (password: string) => {
    return Buffer.from(splicePassword(password), "utf-8").toString("base64");
};

// const unSplicePassword = (spliced: string) => {
//     return spliced
//         .split("")
//         .filter((_, idx) => idx % 2 === 0)
//         .join("")
// };
