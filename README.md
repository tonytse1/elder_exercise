# Repository Reference

https://www.linkedin.com/pulse/real-time-image-classification-tensorflow-daniel-wind

https://github.com/danielwind/pictionary-tutorial

https://www.npmjs.com/package/@tensorflow-models/pose-detection

# To Test Run

Here we use extensively Tensorflow.js on the pose detection. Since their dependancies are not updated for now, we should use legacy-peer-deps to avoid library conflicts when npm install

```
npm install --legacy-peer-deps
```

The React Native Managed workflow Expo 46 is in use. You may then test run by typing:
```
npx expo start
```

# To Build An Android App

Since it is an Expo managed workflow 46, we need eas cli for building a standalone app.

Tidying up app.json to add/update version numbers before build.

Then let's see if eas.json is here, if not you may type:
```
eas build:configure
```
to create it.

You may notice that here we use app certs store in local certs/android or certs/ios instead of letting Expo manage the certs. If you want generate your own certs for Android app:
```
keytool -genkey -v -keystore posedetect.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
```

Then put the keystore file to the certs/android folder

The eas.json need to be adjusted to accommodate it as well.

Don't forget to:
```
touch credentials.json
```

and add the following to it
```
{
    "android": {
      "keystore": {
        "keystorePath": "certs/android/release.keystore",
        "keystorePassword": "xxxx",
        "keyAlias": "xxxx",
        "keyPassword": "xxxx"
      }
    },
    "ios": {
      "provisioningProfilePath": "certs/ios/xxx.mobileprovision",
      "distributionCertificate": {
        "path": "certs/ios/xxx.p12",
        "password": "xxxxxx"
      }
    }
}
```

You may then build an apk for testing:
```
eas build --profile preview --platform android
```

# To Build An iOS App

Two items need to be here: XXXXX.mobileprovision for the app itself and distribution.cer for the developer's app distribution right. Double clicking the .cer to generate .p12 cert. All of these can be generated from Apple Developer webpage

Remember to setup this item in eas.json to let the eas build find local certs instead of asking you for the login name and password of Apple Developer account:

```
...
    "production": {
      "credentialsSource": "local"
    }
...
```

Finally you may build a ips file for testing:
```
eas build --platform ios
```

# To run the app
1. In the terminal:
```
npm start
```
2. Scan the QR code using the Expo app. You must have internet connection to connect with the Expo app.
3. Wait for the app to bundle. If there is no loading bar for bundling for a while, press "R" key to reload, and continue to wait.

## Run config

To change the running configurations, go to the `score-context.tsx` file and change `RUN_APP_CONFIG`.

# To collaboratively develop

To avoid people making changes to the same code and overwriting each other, we use Github when making changes to the code. 

If you use Visual Studio Code (VS) to develop, you can also work with Github via VS (see documentation [here](https://code.visualstudio.com/docs/sourcecontrol/github)). 

## Pre-requisite

1. Ensure you have a [Github](https://github.com/) account.
1. Connect to Github on your terminal with SSH. You can follow [Github's official documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) or follow [this simplified tutorial](
https://kbroman.org/github_tutorial/pages/first_time.html.).

1. Clone this Github project.

## Development Workflow
### 1. Ensure you have the most updated code
**Before making any changes to the code**, make sure you are on the `main` branch and then pull the latest code. 

If you have made any code changes before doing this, you may need to stash your changes first. You can learn more about git stash [here](https://git-scm.com/docs/git-stash).

To check what branch you are on: 
```
git status
```

To change to `main` branch:
```
git checkout main
```

To pull lates code commits from main branch:
```
git pull
```

### 2. Create a branch for your changes
**Before making any changes to the code**, create a branch. This helps isolate a version of the `main` code and can prevent conflicts whilst developing.

If you have made any code changes before doing this, you may need to stash your changes first. You can learn more about git stash [here](https://git-scm.com/docs/git-stash).

It is good practice to create a branch per task and to keep the tasks isolated and small. 

To create a branch:
```
git checkout -b your-new-branch-name
```
The _branch name_ should reflect what task you are going to do. It should be short and concise. For example, `calibration-doc`.

After ensuring you are on the branch you just created (you can use `git status` to check), you can start changing the code.

### 3. Commit changes to the created branch as you develop
You can commit your changes via _Visual Studio_ or the terminal.

To stage all your changes via the terminal:
```
git add .
```
To commit your staged changes:
```
git commit -m "Your commit message"
```
_Commit messages_ should describe what you have changed. For example, "Added doc Github usage".

Commits can help organise what you have changed in the code and can help you debug issues as you develop.

### 4. Push your commits to GitHub
If you are pushing your branch commits for the first time: 
```
git push --set-upstream origin your-branch-name
```
and open a pull request (PR) via the Github link provided in the terminal to share your changes to other coders. 

Otherwise, if you already have a PR, simply: 
```
git push
```

### 5. Merging your changes to the main code
To push your changes to main, you must ensure you have the latest code first. Repeat step 1. 

To pull the latest code from `main` into your branch, first switch to your branch:
```
git checkout your-branch-name
```

Then, pull the latest code from `main`:
```
git pull origin main
```

If there are any conflicts, you may need to resolve the conflicts and commit the merged changes before pushing your changes to the main code. You can merge conflicts via. VS or via the Github website interface. 

To merge your changes, go to your PR via Github website interface and click "Squash and merge". This will squash all the commits in your created branch into one commit in the `main` branch.

# Motion filtering

Motion filtering is for detecting valid poses and to calculate bubble positions based on the valid poses.

## Standalone script to run bubble calibration

For rapid development, this script was written to view recorded poses and calibrated bubble points. 

The source code is stored all in `scripts/cabiration` directory in the project:

- `index.html` is the main file that needs to be served
- `saved_poses.json` stores the saved poses/frames. It stores an array of poses, where each pose is one full body position containing the points of each body part.
- `playSavedPoses.js` renders the drawn image shown below and directly calls the app's `Calibration.js` functions to calibrate the saved poses

<img width="653" alt="preview" src="https://user-images.githubusercontent.com/19773820/233574387-c174e9e5-8ee6-41ec-93ce-99283b4009ed.png">

### To serve script via Visual Studio Code
1. Go to `inspirelab-exercise-app/scripts/calibration/index.html` file
1. Right click on the file and select "Open with Live Server"
1. A window should  open and the stored poses should be animated. To replay the animation, simply refresh the window.

### To record poses for saved_poses.json
1. Uncomment the following line in `CalibrationScreen.tsx`:
```
// console.log("Saved Poses:", JSON.stringify(savedPoses)) // To log saved poses for motion filtering script
```
2. Run the app and complete calibration.
3. Copy data after "Saved Poses:" in the terminal logs.
4. Replace the data in `saved_poses.json` with copied data.


## Future todos
### Bug: Subsequent calibrations do not work

After the first calibration using the app, bubble positions are calculated. However, calibrations after the first calibration do not work (the bubble positions calculated previously are repeatedly used instead of calculating new bubble positions).

### Issue: Invalid poses are skipped and the last valid pose is continued

This means that users can cheat the timed position system.

### Issue: Calibration completion detection

Currently, calibration is complete once enough valid poses is detected. That is not ideal because the person may not have raised their arms yet.

# Version

0.1.1 - A functional Game with refactored Tensorflow JS module
0.2.0 - Fixed the memory leakage when looping the camera video
0.3.0 - Enabling the landscape only mode
0.4.0 - Monkey animation has been added# elder_exercise
