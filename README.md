# Cow Clicker 2
Inspired by Timothy James's smash-hit success [**Cow Clicker**](https://github.com/timothyrjames/cs1520/tree/master/week05/gae/project4), Cow Clicker 2 brings you magnitudes more cows to click&mdash; each with its own wacky effect! Delve deep into the pasture to score as many points as your cow-clicking fingers can muster!

### ~~Visit the site today!~~
~~https://cow-clicker-2.appspot.com/~~

*Cow Clicker 2 is no longer hosted online!*
You can view the local launching instructions below...

## Secure a Service Account Key
Sooo... I may have broken the key we were keeping in the repo by publishing the last commit. It was public for 4 years, but Google caught it and auto-disabled it just now. In other words, it's finally time to properly store our secret keys!

### In Google Cloud Platform...
1. Navigate to `IAM` > `Service Accounts` on the Cow Clicker 2 project
2. Access the cowstore service account and navigate to `Keys`
3. Create a new JSON key and download it
4. Move the key to the repo root and rename it `CowClicker2Key.json`

**This key is needed for logins to function!**

***Note:** I received an email about our OAuth clients being scheduled for deletion, but launching the app and logging in/signing up didn't change anything. I don't think we're actually using our OAuth clients.*

## Launch on Windows
1. Run the `launch.cmd` script
2. Visit http://127.0.0.1:8080 in your browser

## Launch on Linux/GCP
1. Run the `launch.sh` script
2. Visit http://127.0.0.1:8080 in your browser