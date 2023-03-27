interface UTMLabels {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
}
export declare const saveUTM: () => void;
export declare const getUTM: () => UTMLabels;
export {};
