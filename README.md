# OLO - Mobile Marketplace App

## About the Application

OLO is a mobile marketplace application built with React Native and Expo. It allows users to buy and sell items locally, chat with other users, and manage their listings. The app features location-based services, user authentication, and a clean, intuitive interface.

Key features include:

- User authentication (Google Sign-In and Phone Number)
- Location-based item browsing
- Item listing creation and management
- In-app messaging
- User profile management

## How to Run the Application

### Prerequisites

- Node.js (v14 or later)
- Yarn or npm
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac users) or Android Emulator
- Expo Go app on your physical device (optional, for testing on real devices)

### Steps to Run

1. Clone the repository:

   ```
   git clone https://github.com/kashaf12/OLO.git
   cd OLO
   ```

2. Install dependencies:

   ```
   yarn install
   ```

   or

   ```
   npm install
   ```

3. Start the Expo development server:

   ```
   expo start
   ```

4. Run on a simulator or device:
   - Press 'i' for iOS Simulator
   - Press 'a' for Android Emulator
   - Scan the QR code with the Expo Go app on your physical device

## Navigating the Code

The project structure is organized as follows:

- `/app`: Contains the main app navigation structure using Expo Router
- `/components`: Reusable React components
- `/constants`: App-wide constant values and configurations
- `/hooks`: Custom React hooks
- `/screens`: Main screen components for different app sections
- `/store`: State management using Zustand
- `/utils`: Utility functions and helpers

Key files and directories:

- `app/_layout.tsx`: Main app layout and navigation setup
- `screens/AccountStack`: Screens related to user account and authentication
- `screens/AdsStack`: Screens for browsing and managing listings
- `screens/ChatStack`: Screens for in-app messaging
- `screens/SellStack`: Screens for creating and editing listings
- `store/auth.ts`: Authentication state management
- `store/location.ts`: Location state management

To add new features or modify existing ones:

1. Create or update components in the `/components` directory
2. Add new screens in the appropriate subdirectory of `/screens`
3. Update navigation in `/app` directory files
4. Manage state using Zustand stores in `/store`
5. Add new utility functions or constants as needed

## Additional Information

- This project uses Expo for easier development and deployment
- Firebase is used for authentication and backend services
- The app follows a modular structure for easier maintenance and scalability

For more detailed information about specific components or features, refer to the comments within the code files.

## Author

Kashaf Ahmed

- GitHub: [github.com/kashaf12](https://github.com/kashaf12)
- LinkedIn: [linkedin.com/in/kashaf-ahmed](https://www.linkedin.com/in/kashaf-ahmed)
- Email: kashafaahmed@gmail.com

Feel free to reach out for any questions or collaborations!
