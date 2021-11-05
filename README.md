# crds-analytics

Analytics abstraction layer to allow for unified consumption of analytics events.

## How it Works

[Segment](https://segment.com/) or more technically the [analytics.js](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/) package that is created by and used to send tracking information upstream to the various Segment Destinations exposes several methods to the consumer. These methods are typically used by calling the `window['analytics']` object that gets created when using Segment.
What this package does is creates a wrapper around the built in Segment methods that decorates the `props` object with additional information that is valuable for filtering in upstream applications. The wrapped methods that get exposed through this package are:

- [`.track()`](#track)
- [`.page()`](#page)
- [`.identify()`](#identify)

## Learn More in the Segment Docs

- [Getting Started](https://segment.com/docs/getting-started/)
- [Sources](https://segment.com/docs/connections/sources/) - This will be the connection from your project to Segment ([Available Methods](https://segment.com/docs/connections/spec/))
- [Destinations](https://segment.com/docs/connections/destinations/) - This will be where the data goes once in Segment ex: Google Analytics

## Setup

The following sections will be how to implement crds-analytics into various frontend frameworks.

- [Angular](#angular)
- [Stencil](#stencil)
- [Jekyll + Gulp](#jekyll--gulp)

### Angular

**Note:** these instructions are based off of [crds-connect](https://github.com/crdschurch/crds-connect). They assume that you have an existing `AnalyticsService` and are using the [angulartics2](https://github.com/angulartics/angulartics2) library.

### Install Dependencies

The first thing you will want to do is to install the `crds-analytics` package by running `npm i https://github.com/crdschurch/crds-analytics#1.0.0`.

### Making it Available

In `AnalyticsService` you will want to do the following.

1. `import CrdsAnalytics from "crds-analytics";`.
1. Replace `this.analytics` (or whatever property `Angulartics2` is related to) to be a new instance of `CrdsAnalytics`

   ```
   this.analytics = new CrdsAnalytics({
     appName: 'crds-connect',
     segmentWriteKey: environment.SEGMENT_WRITE_KEY
   });
   ```

1. Update `track` (or other related calls)

   ```
   // Convert this...
   this.analytics.eventTrack.next({
     action: 'ConnectSearch',
     properties: {
       Query,
       ResultsCount
     }
   });

   // to this
   this.analytics.track('MyActionName', {
     property1: 'SOME_VALUE',
     property2: 'SOME_OTHER_VALUE',
   });
   ```

1. Remove everything left over related to `angulartics2`
1. Update failing tests if needed.

You may have noticed we are using `environment.SEGMENT_WRITE_KEY` in the above snippet. You will need to add this environment variable to your application with a key matching your desired Segment source if you do not already have it.

### Make Analytics Calls:

[Make Analytics Calls](#how-to-use)

## Stencil

### Install Dependencies

The first thing you will want to do is to install the `crds-analytics` package by running `npm i https://github.com/crdschurch/crds-analytics#1.0.0`.

### Making it Available

In the `src/global/` directory of your project create an `analytics.js` file. This file will be used to initialize the crds-analytics `CrdsAnalytics` class. Your file should look something like this:

```
import CrdsAnalytics from "crds-analytics";

export default () => {
  return new CrdsAnalytics({
    appName: "Online Church",
    segmentWriteKey: process.env.SEGMENT_WRITE_KEY
  });
};
```

### Make Analytics Calls:

[Make Analytics Calls](#how-to-use)

## Jekyll + Gulp

### Install Dependencies

The first thing you will want to do is to install the `crds-analytics` package by running `npm i https://github.com/crdschurch/crds-analytics#1.0.0`.

### Making it Available

In `config.js` you will want to add `node_modules/crds-analytics/dist/main` as a dependency. **Note:** The full path will be relative to the location of the `config.js` file.

This will expose a `crdsAnalytics` object that can be used like the example below

```
window.globalAnalytics = new crdsAnalytics.default({
  appName: 'YOUR_APP_NAME',
  segmentWriteKey: 'YOUR_SEGMENT_WRITE_KEY'
})
```

Loading environment variables may differ for your project, here we are using `process.env` with our application key stored in an environment variable. You will want to supply the Segment key that matches the source you wish to send analytics information to for your application in it's different environemtns.

### Make Analytics Calls:

[Make Analytics Calls](#how-to-use)

## How to Use

To make calls to analytics you will need to do the following, these steps should be done in each file you wish to use analytics calls.

- Import the `analytics.js` file you created `import analytics from ../my-analytics.js`.
- Create an `analytics` variable `private analytics;`.
- Instantiate it in your constructor `this.analytics = analytics();`

Now you will be able to make calls to the aforementioned analytics
methods. You can send data to the various methods accordingly:

## .track()

**Description:** Method used to track an event that a user has completed or _something_ that a user has interacted with.

**Arguments:**

Required: _title:_ `String`

Optional: _props:_ `Object Literal`

Example:

```
this.analytics.track('MyEvent', {
  foo: 'bar'
});
```

## .page()

**Description:** Method for identifying a page that the user has visited.

**Arguments:**

Required: _title:_ `String`

Optional: _props:_ `Object Literal`

Example:

```
this.analytics.page('MyPage', {
  foo: 'bar'
});
```

## .identify()

**Description:** Method used to identify the user that is interacting with the website.

**Arguments:**
Takes in no arguments. This will look for a userId Cookie in the session and send the user information to Segment or return undefined.
