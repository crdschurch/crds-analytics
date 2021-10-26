const decorate = require('../build/index')

test('should deocrate props with userautenticated flag equal to falase', () => {
  const config = {
    appName: 'testAnalytics',
    segmentWriteKey: 'do not need one'
  }
  let props = {
    prop1: 'thing',
    prop2: 123
  }
  let analytics = new decorate.CrdsAnalytics(config);
  expect(analytics.decorateProps(props)).toEqual({
    prop1: 'thing',
    prop2: 123,
    authenticatedUserFlag: false,
  })
})

test('should decorate props with userid and userisauthenticated', () => {
  const config = {
    appName: 'testAnalytics',
    segmentWriteKey: 'do not need one'
  }
  Object.defineProperty(window.document, 'cookie', {
    writable: true,
    value: 'userId=1234567',
  });
  let props = {
    prop1: 'thing',
    prop2: 123
  }
  let analytics = new decorate.CrdsAnalytics(config);
  expect(analytics.decorateProps(props)).toEqual({
    prop1: 'thing',
    prop2: 123,
    authenticatedUserFlag: true,
    ministryplatformcontactid: '1234567'
    })
});