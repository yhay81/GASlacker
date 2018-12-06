# GASlacker

Google Apps Script interface for Slack API

## Usage

### Easy way

1. Create a new Apps Script.
2. Copy entire file of /dist/bundle.js and Paste it to the new apps script.
3. Publish your App Script from Apps Script web editor as an API and copy the key.
4. Create Another App Script and import the library which you created from `Resources>Library`.
5. You can Add your token to your Properties in your scripts and get it and use the library like the Example below.

### Developer way

1. Clone this repository.
2. Change scriptId in .clasp.json to your new empty Apps Script.
3. Do `npm run deploy`.
4. Publish your App Script from Apps Script web editor as an API and copy the key.
5. Create Another App Script and import the library which you created from `Resources>Library`.
6. You can Add your token to your Properties in your scripts and get it and use the library like the Example below.

#### Example

```JavaScript
var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
var slack = GASlacker.methods(token);

function doPost(e){
  var event = JSON.parse(e.postData.contents).event;
  if(event.text.match(/hello/)){
    var text = "Hello," + event.message.username;
    slack.chat.postMessage(event.channel, text);
  }
}
```

## Documentation

https://api.slack.com/methods

## Reference

- https://github.com/os/slacker  
  Python Interface (GASlacker interface imitated this.)

- https://github.com/soundTricker/SlackApp  
  GAS Library for same purpose in CoffeeScript (not updated)

- https://github.com/howdy39/gas-clasp-starter  
  Starter to develop GAS with git

## License

This software is released under the MIT License, see [LICENSE.txt](LICENSE.txt).
