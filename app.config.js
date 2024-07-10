module.exports = {
  expo: {
    name: 'olo',
    slug: 'olo',
    version: '1.0.0',
    scheme: 'olo',
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/favicon.png',
    },
    plugins: [
      '@react-native-firebase/app',
      '@react-native-firebase/auth',
      '@react-native-firebase/crashlytics',
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static',
          },
        },
      ],
      'expo-router',
      '@react-native-google-signin/google-signin',
      [
        'expo-dev-launcher',
        {
          launchMode: 'most-recent',
        },
      ],
      [
        'expo-font',
        {
          fonts: [
            'node_modules/@expo-google-fonts/roboto/Roboto_100Thin.ttf',
            'node_modules/@expo-google-fonts/roboto/Roboto_300Light.ttf',
            'node_modules/@expo-google-fonts/roboto/Roboto_400Regular.ttf',
            'node_modules/@expo-google-fonts/roboto/Roboto_500Medium.ttf',
            'node_modules/@expo-google-fonts/roboto/Roboto_700Bold.ttf',
          ],
        },
      ],
      [
        'expo-location',
        {
          locationAlwaysAndWhenInUsePermission: 'Allow $(PRODUCT_NAME) to use your location.',
        },
      ],
      [
        'expo-image-picker',
        {
          photosPermission: 'The app accesses your photos to let you share them with your friends.',
          cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera',
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#002f34',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.kashaf.olo',
      googleServicesFile: process.env.GOOGLE_SERVICE_INFOPLIST ?? './GoogleService-Info.plist',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.kashaf.olo',
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? './google-services.json',
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: 'd51a1e8f-91bd-4f76-bf50-71cc4a6ff4d3',
      },
      firebase: {
        apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL,
        projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
        storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
        webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
      },
    },
  },
};
