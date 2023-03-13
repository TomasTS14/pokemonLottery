

export const removeTimeStamp = (dateWithTimeStamp: string): string => {
    const date: string = dateWithTimeStamp.slice(0, 11);

    return date;
}