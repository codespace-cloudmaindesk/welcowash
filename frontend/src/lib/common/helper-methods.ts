
export const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};

export const cn = (...classes: (string | undefined | null | false)[]) => {
    return classes.filter(Boolean).join(' ');
};

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mergePayloadHandler = (state: any, { payload }: any) => ({
    ...state,
    ...payload
});
