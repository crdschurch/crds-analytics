"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const analytics_1 = __importDefault(require("analytics"));
const segment_1 = __importDefault(require("@analytics/segment"));
class CrdsAnalytics {
    constructor(crdsAnalyticsConfig) {
        this.crdsAnalyticsConfig = crdsAnalyticsConfig;
        this.debug = false;
        this.log("init()");
        this.analytics = (0, analytics_1.default)({
            app: crdsAnalyticsConfig.appName,
            plugins: [
                (0, segment_1.default)({
                    writeKey: crdsAnalyticsConfig.segmentWriteKey
                })
            ]
        });
    }
    log(msg = "") {
        if (this.debug) {
            console.log("CrdsAnalytics: ", msg);
        }
    }
    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    decorateProps(props) {
        this.log(`decorateProps(${JSON.stringify(props)})`);
        const id = this.getUserID();
        if (!id) {
            return Object.assign({ authenticatedUserFlag: false }, props);
        }
        return Object.assign({ ministryplatformcontactid: id, authenticatedUserFlag: true }, props);
    }
    getUserID() {
        this.log("getUserID()");
        return this.getCookie("userId");
    }
    identify() {
        this.log(`identify(${this.getUserID()})`);
        this.analytics.identify(this.getUserID() || undefined);
    }
    track(title, props = {}) {
        this.log(`track(${title})`);
        this.analytics.track(title, this.decorateProps(props));
    }
    page(title, props = {}) {
        this.log(`page()`);
        this.analytics.page(title, this.decorateProps(props));
    }
}
exports.default = CrdsAnalytics;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwwREFBeUQ7QUFDekQsaUVBQStDO0FBSy9DLE1BQXFCLGFBQWE7SUFLaEMsWUFBb0IsbUJBQXdDO1FBQXhDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFKbkQsVUFBSyxHQUFZLEtBQUssQ0FBQztRQUs5QixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBQSxtQkFBUyxFQUFDO1lBQ3pCLEdBQUcsRUFBRSxtQkFBbUIsQ0FBQyxPQUFPO1lBQ2hDLE9BQU8sRUFBRTtnQkFDUCxJQUFBLGlCQUFhLEVBQUM7b0JBQ1osUUFBUSxFQUFFLG1CQUFtQixDQUFDLGVBQWU7aUJBQzlDLENBQUM7YUFDSDtTQUNBLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFTyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUU7UUFDakIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN0QztJQUNKLENBQUM7SUFFTyxTQUFTLENBQUMsS0FBSztRQUN0QixJQUFJLElBQUksR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ3ZCLElBQUksYUFBYSxHQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RCxJQUFJLEVBQUUsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNkLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUU7Z0JBQ3pCLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BCO1lBQ0QsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDeEIsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzNDO1NBQ0Y7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFUSxhQUFhLENBQUMsS0FBSztRQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwRCxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFNUIsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNQLHVCQUNFLHFCQUFxQixFQUFFLEtBQUssSUFDekIsS0FBSyxFQUNSO1NBQ0g7UUFFRCx1QkFDRSx5QkFBeUIsRUFBRSxFQUFFLEVBQzdCLHFCQUFxQixFQUFFLElBQUksSUFDeEIsS0FBSyxFQUNSO0lBQ0osQ0FBQztJQUVNLFNBQVM7UUFDZCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU0sUUFBUTtRQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxTQUFTLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRU0sS0FBSyxDQUFDLEtBQUssRUFBRSxRQUFnQixFQUFFO1FBQ3BDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVNLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBZ0IsRUFBRTtRQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztDQUNKO0FBNUVELGdDQTRFQyJ9