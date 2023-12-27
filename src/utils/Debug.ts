const debug = false;

export const debugMessage = (string: string) => {
    if (debug) {
        console.info(string);
    }
};

export const debugDelay = async () => {
    if (debug) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
    }
};
