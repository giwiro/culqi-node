import { HttpRequestOptions } from './request';
export declare type Token = {
    object: 'token';
    id: string;
    type: string;
    email: string;
    creation_date: number;
    card_number: string;
    last_four: string;
    active: boolean;
    iin: {
        object: 'iin';
        bin: string;
        card_brand: string;
        card_type: string;
        card_category: string;
        issuer: {
            name: string;
            country: string;
            country_code: string;
            website: string;
            phone_number: string;
        };
        installments_allowed: number[];
    };
    client: {
        ip: string;
        ip_country: string;
        ip_country_code: string;
        browser: string;
        device_fingerprint: string;
        device_type: string;
    };
    metadata: {
        [key: string]: string;
    };
};
declare type CreateTokenRequest = {
    card_number: string;
    cvv: string;
    expiration_month: string;
    expiration_year: string;
    email: string;
    metadata?: {
        [key: string]: string;
    };
};
declare type GetTokenRequest = {
    id: string;
};
declare type GetTokensRequest = {
    creation_date?: string;
    creation_date_to?: string;
    card_brand?: string;
    card_type?: string;
    device_type?: string;
    bin?: string;
    country_code?: string;
    limit?: string;
    before?: string;
    after?: string;
};
declare type GetTokensResponse = {
    data: Token[];
    paging: {
        previous: string;
        next: string;
        cursors: {
            before: string;
            after: string;
        };
        remaining_items: number;
    };
};
declare type UpdateTokenRequest = {
    id: string;
    metadata?: {
        [key: string]: string;
    };
};
export declare const tokens: {
    createToken: (req: CreateTokenRequest, extraHttpOptions?: Partial<HttpRequestOptions> | undefined) => Promise<Token>;
    getTokens: (req?: GetTokensRequest | undefined, extraHttpOptions?: Partial<HttpRequestOptions> | undefined) => Promise<GetTokensResponse>;
    getToken: (req: GetTokenRequest, extraHttpOptions?: Partial<HttpRequestOptions> | undefined) => Promise<Token>;
    updateToken: (req: UpdateTokenRequest, extraHttpOptions?: Partial<HttpRequestOptions> | undefined) => Promise<Token>;
};
export {};
//# sourceMappingURL=tokens.d.ts.map