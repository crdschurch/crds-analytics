import Analytics, { AnalyticsInstance } from "analytics";
import segmentPlugin from "@analytics/segment";

import { CrdsAnalyticsConfig } from "./models/crds-analytics.model";


export default class CrdsAnalytics {
   private debug: boolean = false;
   public static instance: CrdsAnalytics;
   private analytics: AnalyticsInstance;

  constructor(private crdsAnalyticsConfig: CrdsAnalyticsConfig) {
    this.log("init()");
    this.analytics = Analytics({
      app: crdsAnalyticsConfig.appName,
      plugins: [
        segmentPlugin({
          writeKey: crdsAnalyticsConfig.segmentWriteKey,
          customScriptSrc: `https://analytics.segment.crossroads.net/analytics.js/v1/${crdsAnalyticsConfig.segmentWriteKey}/analytics.min.js`
        })
      ]
      });
   }

   private log(msg = "") {
      if (this.debug) {
         console.log("CrdsAnalytics: ", msg);
      }
   }

   private getCookie(cname) {
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

   private decorateProps(props) {
      this.log(`decorateProps(${JSON.stringify(props)})`);
      const id = this.getUserID();
  
      if (!id) {
        return {
          authenticatedUserFlag: false,
          ...props
        };
      }
  
      return {
        external_application_value: id,
        ministryplatformcontactid: id,
        authenticatedUserFlag: true,
        ...props
      };
    }

    public getUserID() {
      this.log("getUserID()");
      return this.getCookie("userId");
    }

    public identify(props: object = {}) {
      this.log(`identify(${this.getUserID()})`);
      this.analytics.identify(this.decorateProps(props));
    }
  
    public track(title, props: object = {}) {
      this.log(`track(${title})`);
      this.analytics.track(title, this.decorateProps(props));
    }
  
    public page(title, props: object = {}) {
      this.log(`page()`);
      this.analytics.page(title, this.decorateProps(props));
    }
}
