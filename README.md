![Repo Cover image](https://i.imgur.com/MW5MqrD.png "Repo Cover image")

## GitHub Issue Tracker

Ready-to-use tracker for GitHub issues written in React Native. 

Supports filters, sorting, pagination and bookmarks!

<br />


### :sparkles: Highlights 

- Cleanly separated view / state architecture

- Full static typechecking

- 100% unit test coverage

<br />


### :page_with_curl: Tech Stack

- [React Native 0.63](https://reactnative.dev/ " React Native 0.63") *(with hooks)*

- [Expo SDK 40.0 ](https://expo.io/ "Expo SDK 40")

- [TypeScript 4.0.0](https://www.typescriptlang.org/ "TypeScript 4.0.0")

- [Redux 4.0.5](https://redux.js.org/introduction/installation "Redux 4.0.5") *(with react-redux & redux-thunk)*

- [ Jest 26.6.0](https://jestjs.io/ " Jest 26.6.0")* (and react-test-renderer)*

<br />

### :open_file_folder: Installation

1. **Clone the repository**

 	`git clone https://github.com/iuliuvisovan/github-issue-tracker.git`
 
1. **Move to project folder**

 	`cd github-issue-tracker`
 
1. (if missing) **Install Yarn**

 	`npm install -g yarn`
1. **Install dependencies**

	`yarn`

1. (if missing) **Install Expo CLI**

	`npm install -g expo-cli`
	
<br />

### :iphone: Running

- **On an iOS simulator** (MacOS + XCode installation needed):

	`yarn ios`
	
- **On an Android Emulator**:

	`yarn android`
	
- **On your own phone** (via the [Expo Android/iOS app](https://apps.apple.com/us/app/expo-client/id982107779 "Expo Client ")):

	 `yarn start`, then wait for a QR code to show up in console. Scan it with your iOS/Android **Camera** app. It will prompt you to open it with the **Expo Client** app.

<br />

### 🧪 Testing

This app features testing using Jest and React Native Test Renderer.

- **Running the tests**:

	`yarn test`

- **Running the tests** & also updating the snapshots:

	`yarn test -u`

After running the tests, coverage information in HTML format is available in the `./coverage` folder.









