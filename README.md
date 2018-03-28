# GASlacker

Google Apps Script interface for Slack API

## Usage

Add This Library from Google Apps Script.(Libraries are in Resources tab)
`MCPiGxYANiZlb7LnYOqREqeJzI9uQ3ses`

## Examples

```JavaScript
var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
var slack = GASlacker.methods(token);

function doPost(e){
  var event = JSON.parse(e.postData.contents).event;
  if(event.text.match(/hello/)){
    slack.chat.postMessage(event.channel, "Hello," + event.message.username);
  }
}
```

## Documentation

https://api.slack.com/methods

## Reference

https://github.com/os/slacker
https://github.com/soundTricker/SlackApp
https://github.com/howdy39/gas-clasp-starter

## License

This software is released under the MIT License, see [LICENSE.txt](LICENSE.txt).
