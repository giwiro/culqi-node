declare type CulqiOptions = {
    privateKey?: string;
    pciCompliant?: boolean;
    publicKey?: string;
};
declare const _default: {
    new (options?: CulqiOptions): {
        tokens: {
            createToken: (req: {
                card_number: string;
                cvv: string;
                expiration_month: string;
                expiration_year: string;
                email: string;
                metadata?: {
                    [key: string]: string;
                } | undefined;
            }, extraHttpOptions?: Partial<import("./request").HttpRequestOptions> | undefined) => Promise<import("./tokens").Token>;
            getTokens: (req?: {
                creation_date?: string | undefined;
                creation_date_to?: string | undefined;
                card_brand?: string | undefined;
                card_type?: string | undefined;
                device_type?: string | undefined;
                bin?: string | undefined;
                country_code?: string | undefined;
                limit?: string | undefined;
                before?: string | undefined;
                after?: string | undefined;
            } | undefined, extraHttpOptions?: Partial<import("./request").HttpRequestOptions> | undefined) => Promise<{
                data: import("./tokens").Token[];
                paging: {
                    previous: string;
                    next: string;
                    cursors: {
                        before: string;
                        after: string;
                    };
                    remaining_items: number;
                };
            }>;
            getToken: (req: {
                id: string;
            }, extraHttpOptions?: Partial<import("./request").HttpRequestOptions> | undefined) => Promise<import("./tokens").Token>;
            updateToken: (req: {
                id: string;
                metadata?: {
                    [key: string]: string;
                } | undefined;
            }, extraHttpOptions?: Partial<import("./request").HttpRequestOptions> | undefined) => Promise<import("./tokens").Token>;
        };
    };
};
export = _default;
//# sourceMappingURL=index.d.ts.map