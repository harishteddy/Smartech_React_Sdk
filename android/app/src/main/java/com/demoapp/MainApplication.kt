package com.demoapp

import android.app.Application
import android.content.Intent.getIntent
import android.view.View
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.uimanager.util.ReactFindViewUtil
import com.facebook.soloader.SoLoader
import com.netcore.android.Smartech
import com.netcore.android.smartechpush.SmartPush
import com.netcore.android.smartechpush.notification.SMTNotificationOptions
import io.hansel.core.logger.HSLLogLevel
import io.hansel.hanselsdk.Hansel
import java.lang.ref.WeakReference
import com.netcore.android.logger.SMTDebugLevel
import com.smartechbasereactnative.SmartechBasePlugin

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // add(MyReactNativePackage())
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()

      val smartech = Smartech.getInstance(WeakReference(applicationContext))
      smartech.initializeSdk(this)
      smartech.setDebugLevel(SMTDebugLevel.Level.VERBOSE)
      smartech.trackAppInstallUpdateBySmartech()

      val smartechBasePlugin = SmartechBasePlugin.instance
      smartechBasePlugin.init(this)
      // enable px sdk logs
      HSLLogLevel.all.isEnabled = true
      HSLLogLevel.mid.isEnabled = true
      HSLLogLevel.debug.isEnabled = true
      Hansel.enableDebugLogs()

      setupNotificationOptions()


      val nativeIdSet: MutableSet<String> = HashSet()
      nativeIdSet.add("hansel_ignore_container")

      ReactFindViewUtil.addViewsListener(object : ReactFindViewUtil.OnMultipleViewsFoundListener {
          override fun onViewFound(view: View, nativeID: String) {
              view.setTag(R.id.hansel_ignore_view, true)
          }
      }, nativeIdSet)


      


      SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }
  }

    private fun setupNotificationOptions() {
        val options = SMTNotificationOptions(this).apply {
            brandLogo = "" // e.g. logo is a sample name for brand logo
            largeIcon = "" // e.g. icon_notification is a sample name for large icon
            smallIcon = "" // e.g. ic_action_play is a sample name for small icon
            smallIconTransparent = "" // e.g. ic_action_play is a sample name for a transparent small icon
            transparentIconBgColor = "#000000"
            placeHolderIcon = ""
        }
        SmartPush.getInstance(WeakReference(this)).setNotificationOptions(options)
    }

}
