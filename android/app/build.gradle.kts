plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("com.facebook.react")
}

react {
    autolinkLibrariesWithApp()
}

val enableProguardInReleaseBuilds = false
val jscFlavor = "io.github.react-native-community:jsc-android:2026004.+"

android {
    namespace = "com.whatsapp"
    compileSdk = rootProject.extra["compileSdkVersion"] as Int
    buildToolsVersion = rootProject.extra["buildToolsVersion"] as String
    ndkVersion = rootProject.extra["ndkVersion"] as String

    defaultConfig {
        applicationId = "com.whatsapp"
        minSdk = rootProject.extra["minSdkVersion"] as Int
        targetSdk = rootProject.extra["targetSdkVersion"] as Int
        versionCode = 1
        versionName = "1.0"
    }

    signingConfigs {
        getByName("debug") {
            storeFile = file("debug.keystore")
            storePassword = "android"
            keyAlias = "androiddebugkey"
            keyPassword = "android"
        }
    }

    buildTypes {
        getByName("debug") {
            signingConfig = signingConfigs.getByName("debug")
        }
        getByName("release") {
            signingConfig = signingConfigs.getByName("debug")
            isMinifyEnabled = enableProguardInReleaseBuilds
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro",
            )
        }
    }
}

dependencies {
    implementation("com.facebook.react:react-android")

    if (project.findProperty("hermesEnabled")?.toString()?.toBoolean() == true) {
        implementation("com.facebook.react:hermes-android")
    } else {
        implementation(jscFlavor)
    }
}
