You can create your custom events and add them to pointers, all you need to do is to create an object that inherits from `BaseEvent`, then do your custom logic on the pointers methods that are inherited from `BaseEvent`

!!! Remember
    Remember to call `super.{method}(e)` on each of your pointers methods
    
    
To add your custom events to pointers use the `addEvent` method, like:

```javascript
$p().addEvent(YourCustomEvent);
```
