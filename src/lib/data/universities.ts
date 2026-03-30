export interface LocalUniversity {
    name: string;
    city: string;
    rank: number;
    chance: number;
    type: "Grant" | "Paid";
    desc: string;
    price: string;
    site?: string;
}

export interface InternationalUniversity {
    name: string;
    country: string;
    rank: number;
    worldRank: string;
    desc: string;
    price: string;
    site?: string;
}

import { LOCAL_UNIVERSITIES as EXP_LOCAL, INTERNATIONAL_UNIVERSITIES as EXP_INT } from "./universities-expanded";

export const LOCAL_UNIVERSITIES: LocalUniversity[] = EXP_LOCAL;
export const INTERNATIONAL_UNIVERSITIES: InternationalUniversity[] = EXP_INT;
