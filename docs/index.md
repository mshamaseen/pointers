# About
Pointers is flexible open-source library that can recognize gestures made by touch, mouse, and pointer-events.

## QuickStart
If you know how to use JQuery, then you already know how to use Pointers!

```javascript
$p('YourSelector').on('tap nthtap:2 press press:up pan:start.namespace pan:end.namespace pan.namespace',function(){
console.info('Hey! You just trigger the handler!');
})
```

!!! Note
    Note the `p` between the dollar sign and the selector.

And that is it for simple use 😃

## Example
<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="poPzeYd" data-user="shamaseen" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/shamaseen/pen/poPzeYd">
  </a> by shamaseen (<a href="https://codepen.io/shamaseen">@shamaseen</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

<br>
<br>

## What makes it flexible?
Because you can easily define your own event and add it to the listener, with all of the `BaseEvent` properties available for your `CustomEvent` 
