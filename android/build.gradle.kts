buildscript {
    extra.apply {
        set("buildToolsVersion", "37.0.0")
        set("minSdkVersion", 24)
        set("compileSdkVersion", 37)
        set("targetSdkVersion", 36)
        set("ndkVersion", "27.1.12297006")
        set("kotlinVersion", "2.2.0")
    }
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle")
        classpath("com.facebook.react:react-native-gradle-plugin")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin")
    }
}

plugins {
    id("com.facebook.react.rootproject")
}
