# Usage

## Pattern
Pointer object is the main object for pointers, its a [singleton](https://en.wikipedia.org/wiki/Singleton_pattern) object, so calling `$p` will always return the same object.

Further more, this package is designed to be so close to JQuery syntax, so no need to come back to the documentation every time you code 😄.

## Listen on events
To attach an event handler function for one or more events to the selected elements use the following syntax:

```javascript
$p('Selector').on('event:sub.namespace',[, selector ] [, data ], handler);
```

Exactly like JQuery.

!!! Note
    Event can be either pevents (Pointer events) or [JS events](https://developer.mozilla.org/en-US/docs/Web/API/Event)
    
!!! Note
    `sub` `namespace` `selector` `data` can be neglected
    
## Access pevent on event object

If you are using pevent you will have a `pevent` object in the event argument.

```javascript
$p('Selector').on('tap',function(e){
    console.info(e.pevent); // pointer event object
})
```

## Remove events handler
To remove events handler use the following syntax:

```javascript
$p('Selector').off(events[,selector])
```

!!! Note
    Unlike JQuery, you can't remove event handler using the handler as an identifier, instead use namespace.
    

## Conditions
You can add conditions to events, if these conditions failed then the handler will not be triggered.

```javascript
$p('Selector').condition((e,pevent) => {
//your condition here
}).on('tap',function(){
console.info('tap worked!');
})
```

where `e` is the native event object and `pevent` is the pointer event.

In the above example if the user tap on the element pointers.js will check your condition, if your condition return true then the console will print  'tap worked!' otherwise nothing will happen.


## Specify pointers count

Sometime you want to trigger a handler only if specific number of pointers are on the the element, for example, you want to move the scene on a touch device if the user moved the screen with 2 fingers, to do so, specify how many pointers needed to trigger your handler.

```javascript
$p('Selector').pointersCount(2).on('pan:move',function(){
// do your stuff here
})
```

!!! Note
    pointersCount method will be ignored on events caused by mouse, as mouse is always assumed to have one pointer count.

## Pass more properties to events

If you want to pass custom properties to events call `setOptions`

```javascript
$p('Selector').setOption({"hellow":"Hey you got that property!"}).on('pan:move',function(e){
console.info(e.pevent.hellow); // Hey you got that property!
})
```

## Get events associated to an element

You can get all the events associated to an element using `getEvents` method

```javascript
$p('Selector').getEvents();
```

## Add Custom event

To add new custom event to the event list call `addEvent` &nbsp;&nbsp; [learn more ...](Events/CustomEvent.md)

```javascript
$p('Selector').addEvent(YourCustomEvent);
```
