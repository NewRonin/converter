import { defineStore } from "pinia";

type IMainState = {
    protocol: String,
    host: String;
    port: String;
    rates: String;
    loading: Boolean;
};

export const useMainStore = defineStore("main", {
    state: (): IMainState => ({
        protocol: process.env?.API_PROTOCOL || "",
        host: process.env?.API_HOST || "",
        port: process.env?.PORT || "",
        rates: '',
        loading: true,
    }),

    actions: {
        getApi(url: string): string {
            return (
                this.protocol +
                "://" +
                this.host +
                ":" +
                url
            );
        },

        
    },
});