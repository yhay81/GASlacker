# GASlacker

Google Apps Script interface for Slack API

## Usage

Add This Library from Google Apps Script.(Libraries are in Resources tab)

```
M1Qcbat9xEP7WrceSfuSbZuJzI9uQ3ses
```

## Examples

```JavaScript
var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
var slack = GASlacker.create(token);

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
