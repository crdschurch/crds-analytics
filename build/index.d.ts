import { CrdsAnalyticsConfig } from "./models/crds-analytics.model";
export default class CrdsAnalytics {
    private crdsAnalyticsConfig;
    private debug;
    static instance: CrdsAnalytics;
    private analytics;
    constructor(crdsAnalyticsConfig: CrdsAnalyticsConfig);
    private log;
    private getCookie;
    private decorateProps;
    getUserID(): string;
    identify(): void;
    track(title: any, props?: object): void;
    page(title: any, props?: object): void;
}
