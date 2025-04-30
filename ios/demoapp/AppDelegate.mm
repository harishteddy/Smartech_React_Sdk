#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <Smartech/Smartech.h>
#import <SmartPush/SmartPush.h>
#import <UserNotifications/UserNotifications.h>
#import <UserNotificationsUI/UserNotificationsUI.h>
#import "SmartechBaseReactNative.h"
#import "SmartechRCTEventEmitter.h"
#import <React/RCTLinkingManager.h>
#import <SmartechAppInbox/SmartechAppInbox.h>

@interface AppDelegate () <UNUserNotificationCenterDelegate,SmartechDelegate>

@end

@implementation AppDelegate 
//static NSString *const kDeeplinkIdentifier = @"your_deeplink_identifier";
//static NSString *const kSMTDeeplinkNotificationIdentifier = @"your_notification_identifier";


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  [UNUserNotificationCenter currentNotificationCenter].delegate = self;
  [[Smartech sharedInstance] initSDKWithDelegate:self withLaunchOptions:launchOptions];
  [[SmartPush sharedInstance] registerForPushNotificationWithDefaultAuthorizationOptions];
  [[Smartech sharedInstance] setDebugLevel:SMTLogLevelVerbose];


  SMTAppInboxViewController  *appInboxController =
  [[SmartechAppInbox sharedInstance] getAppInboxViewController];
  
  NSArray <SMTAppInboxCategoryModel *> *appInboxCategoryArray;
  appInboxCategoryArray  = [[NSArray alloc] init];
  appInboxCategoryArray = [[SmartechAppInbox sharedInstance] getAppInboxCategoryList];
  
  
 
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  self.moduleName = @"demoapp";
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [[SmartPush sharedInstance] didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}


- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  [[SmartPush sharedInstance] didFailToRegisterForRemoteNotificationsWithError:error];
}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    BOOL handleBySmartech = [[Smartech sharedInstance] application:app openURL:url options:options];
    if(!handleBySmartech) {
        //Handle the url by the app
    }
    return YES;
}
#pragma mark - UNUserNotificationCenterDelegate Methods
- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler {
  [[SmartPush sharedInstance] willPresentForegroundNotification:notification];
  completionHandler(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge);
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler {
  NSDictionary *userInfo = response.notification.request.content.userInfo;
      
      // Extract the deeplink from smtPayload if it exists
      NSDictionary *smtPayload = userInfo[@"smtPayload"];
      NSString *deeplinkURL = smtPayload[@"deeplink"];
      
      if (deeplinkURL) {
          // Convert the deeplink string to an NSURL and pass it to React Native's Linking Manager
          NSURL *url = [NSURL URLWithString:deeplinkURL];
          [RCTLinkingManager application:[UIApplication sharedApplication] openURL:url options:@{}];
      }
  [[SmartPush sharedInstance] didReceiveNotificationResponse:response];
  
  completionHandler();
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void(^)(UIBackgroundFetchResult))completionHandler {
   [[SmartPush sharedInstance] didReceiveRemoteNotification:userInfo withCompletionHandler:completionHandler];
}

#pragma mark Smartech Deeplink Delegate

- (void)handleDeeplinkActionWithURLString:(NSString *)deeplinkURLString andNotificationPayload:(NSDictionary *)notificationPayload {
  NSMutableDictionary *smtData = [[NSMutableDictionary alloc] initWithDictionary:notificationPayload];
  smtData[kDeeplinkIdentifier] = smtData[kDeeplinkIdentifier];
  smtData[kCustomPayloadIdentifier] = smtData[kSMTCustomPayloadIdentifier];
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 1.5 * NSEC_PER_SEC), dispatch_get_main_queue(), ^{
    NSLog(@"SMTLOGGER DEEPLINK: %@",deeplinkURLString);
    [[NSNotificationCenter defaultCenter] postNotificationName:kSMTDeeplinkNotificationIdentifier object:nil userInfo:smtData];
  });
 
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
@end
