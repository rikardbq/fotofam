export const getBase64 = (blob: Blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = (e: any) => reject(new Error(JSON.stringify(e)));
        reader.readAsDataURL(blob);
    });
};
