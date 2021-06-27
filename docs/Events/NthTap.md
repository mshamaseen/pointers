##Tap  `nthtap`
Extend [BaseEvent](BaseEvent.md)

Detect numbers of tap.

!!! note
    You should call this event with sub-event, if you didn't the default sub-event will be 2 (which mean detect two taps) 

###Properties
* `pressingThreshold` <<span class="type-text">integer</span>> - Maximum press time in ms
* `maxTimeBetweenTaps` <<span class="type-text">integer</span>> - Maximum allowed time between every tap.

###Methods
* None.

### Subs
* `<any integer value>` the number of taps to detect.
