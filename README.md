# UI-Extensions-Dogfooding

This is a UI extension that shows how many entries link to the one you are currently viewing. It's a solution that is only built for the purpose of the dogfooding session so even though it seems to function it might not work for real use cases.

This is how it looks like:  
![this is how it looks like](https://media.giphy.com/media/3og0IRc4YB2YyATPVu/giphy.gif)

# Dogfooding guide

Prerequisites:
- Node.js installed
- A test space with a Blog template
- A github account
- A text editor to edit some code

## 1. Create a test space
Make sure select the "Blog" example. For now the extension only works with this Content Model.

![Create a new space](https://www.evernote.com/shard/s265/sh/72479482-1411-4fe6-bc38-6baed82d0cf7/fcdbb050f3cdcebd/res/20b7e51d-34ba-4c9e-a029-062271f95d14/skitch.png?resizeSmall&width=832)

## 2. Install the contentful-extension CLI tool

In order to test and deploy the Extension we'll need to use this tool.
Run:
```
npm install -g contentful-extension-cli
```
You can find more information about the tool in its [Github repo](https://github.com/contentful/contentful-extension-cli) if you want.

## 3. Clone this repo locally

Run:
```
git clone git@github.com:martzoukos/UI-Extensions-Dogfooding.git
```
or do it via your github desktop client if you're working with one.

## 4. Update the config.js file with your Space credentials

If you go to the folder of the app you just cloned you'll find a file named `config.sample.js`.

First rename it to `config.js`.

Then replace the values `spaceID`, `cdaToken`, `cdaToken` with the correct fields that you'll get from your Space:

![Get your spaceID and cdaToken](https://www.evernote.com/shard/s265/sh/1784dfb2-c774-4e38-8d3d-dfbac34d0d82/4784f8cd3794efc4/res/6dd8fd23-87c4-4ce9-9fb9-d3c25f8d8392/skitch.png?resizeSmall&width=832)

![Get your cmaToken](https://www.evernote.com/shard/s265/sh/751e409e-e9fa-4682-9427-1fcdf50e64a3/1ffbb455f5ff4798/res/fc93bcc0-b2a7-4252-ab68-6fa8caf75922/skitch.png?resizeSmall&width=832)

## 5. Build the extension

Because we will not host the extension code somewhere on our server we'll build it into one html file so that we can upload that to Contentful instead.
More information about why and what in the [contentful-extension cli tool's repo](https://github.com/contentful/contentful-extension-cli#difference-between-src-and-srcdoc-properties).

To do this just run:
```
node build.js
```

To verify that the command went through see if there is a file called `build.html` in your project folder.

## 6. Deploy the UI Extension to your Contentful Space

Since we have our extension ready let's use it in our Space's Content Model.  
To do this, we first have to use the contentful-extension cli tool to deploy the extension.  
And before we do that, we first need to allow access to the cli tool to perform actions to our Space from our behalf – this is what we have our CMA token for.
You can find it from the previously created `config.js` file (it's the one next to `cmaToken`).

Give access by running:
```
export CONTENTFUL_MANAGEMENT_ACCESS_TOKEN=<YOUR_CMA_TOKEN>
```

Then deploy the extension by running:
```
contentful-extension create --space-id <YOUR_SPACE_ID>
```

## 7. Edit a the Category content type

Finally, link the UI extension with a field in your content model. For this we'll edit the Category content type by creating a new field of **Reference type**:

![](https://www.evernote.com/shard/s265/sh/7a4a1f88-22e2-4adc-9038-73a73ccebc33/8da2c3829ad84330/res/393ba088-925d-43f6-b30f-936a3bd86bba/skitch.png?resizeSmall&width=832)

In the "Appearance" tab we should be able to see our UI Extension and select it

![](https://www.evernote.com/shard/s265/sh/cf7caf06-b018-4dd2-9cc5-735ccb115da7/92b62645ffa6cdaf/res/67a0ce5d-5cec-4e21-9c37-5c42f7a00363/skitch.png?resizeSmall&width=832)

## 8. Congrats!

Now go to any category under your Space's Content and see the button. Click on the "Who links to me?" button and see if you get 1 or 2 referencing entries.

![this is how it looks like](https://media.giphy.com/media/3og0IRc4YB2YyATPVu/giphy.gif)

Now you know which entries rely on this before you delete it :).
