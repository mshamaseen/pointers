##Mouse  `mouse`
Extend [BaseEvent](BaseEvent.md)

When using the js [mouse events](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) you would expect that these events trigger only for mouse as a pointer type, well guess what, you are wrong!
JS Mouse Events also triggered on touch devices using touch pointers, this may create conflicts and issues with your events, thus, using this event solve the issue.

!!! Note
    Unlike [mouse events](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent), this event only triggered by mouse pointers.


###Properties
* None.

###Methods
* None.

### Subs
* `down`
* `up`
* `move`
* `enter`
* `leave`
* `cancel`
