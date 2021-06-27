##BaseEvent
`BaseEvent` is the base class for all the events, it includes the properties and methods that are common between all of them.


###Properties
                 
* `name` <<span class="type-text">string</span>> - Event name
* `sub` <<span class="type-text">null|string</span>> - the sub-event
* `namespace` <<span class="type-text">null|string</span>> - event namespace
* `selector` <<span class="type-text">null|string</span>> - the selector that passed to event, if this is not null then the event will not trigger if this isn't the target element 
* `data` <<span class="type-text">null|object</span>> - The data that passed to the event
* `handler` <<span class="type-text">function</span>> - The handler that passed to the event.
* `conditions` <<span class="type-text">array</span>> - All the conditions passed to the event
* `jqueryElement` <<span class="type-text">object</span>> - The JQuery element of the current selector  
* `currentSelector` <<span class="type-text">string</span>> - The selector that is passed as an argument to the `$p` function
                    
* `currentPointers` <<span class="type-text">null|object</span>> - All the pointers that are currently pressing on the element.
* `startingCoordinates` <<span class="type-text">null|object</span>> - The coordinates of where the primary pointer start pressing.
* `firstInteractionAt`<<span class="type-text">null|integer</span>> - The primary pointer first press time.
* `hasMoved` <<span class="type-text">boolean</span>> - If any of the pointers moved an amount equal or larger than the `movingThreshold` **while pressing** then this property will be true, false otherwise.
* `movingThreshold` <<span class="type-text">integer</span>> - Maximum allowed movement before the `hasMoved` property change to true.
* `triggeredAt` <<span class="type-text">null|integer</span>> - The time of when the handler is triggered.
* `succeed` <<span class="type-text">boolean</span>> - weather the event succeed on its main condition or not (used internally)
* `subs` <<span class="type-text">array</span>> - List of all the available subs for this method (must be override by the child class)

###Methods

* `handle` :<span class="type-text">void</span> - This is the first method that the `Pointers` called when any js pointer happen.
* `pointerdown` :<span class="type-text">void</span> - Automatically triggered method when js native `pointerdown` happen on the element.
* `pointerup` :<span class="type-text">void</span> - Automatically triggered method when js native `pointerup` happen on the element.
* `pointermove` :<span class="type-text">void</span> - Automatically triggered method when js native `pointermove` happen on the element.
* `pointerleave` :<span class="type-text">void</span> - Automatically triggered method when js native `pointerleave` happen on the element.
* `pointercancel` :<span class="type-text">void</span> - Automatically triggered method when js native `pointercancel` happen on the element.
* `pointerenter` :<span class="type-text">void</span> - Automatically triggered method when js native `pointerenter` happen on the element.
* `validateConditions` :<span class="type-text">boolean</span> - Validate the external conditions passed to the event.
* `distance` :<span class="type-text">integer</span> - Calculate the distance between the `startingCoordinates` and the argument, you must make sure that `startingCoordinates` is not null before calling this method.
* `runIfOk` :<span class="type-text">integer</span> - Runs the passed handler if the event succeed all the conditions.  
* `getAvailableSubs` :<span class="type-text">array</span> - Return all the available sub-events for this event.
* `reset` :<span class="type-text">void</span> - reset properties to its default values
 


### Subs
* None.
