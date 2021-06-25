import {Tap} from "./Events/Tap";
import {Press} from "./Events/Press";
import {Pan} from "./Events/Pan";
import {NthTap} from "./Events/NthTap";

class Pointers {

    constructor(){
        this.currentSelector = null;
        this.currentJqueryElement = null;
        this.elements = new Map();
        this.conditions = [];
        this.options = {};

        this.events = {
            tap: Tap,
            nthtap: NthTap,
            press:Press,
            pan:Pan
        };
    }

    _splitEvents(eventsWithNamespace)
    {
        let events = eventsWithNamespace.split(' ');
        return events.map(event => {
            let result = [event,null,null];

            let firstColumn = event.indexOf(':');
            let firstDot = event.indexOf('.');

            if(firstColumn > -1)
            {
                result[0] = event.substr(0,firstColumn);
                if(firstDot > -1){
                    result[1] = event.substr(firstColumn+1,firstDot-firstColumn-1);
                    result[2] = event.substr(firstDot+1)
                }else{
                    result[1] = event.substr(firstColumn+1);
                }
            }else if(firstDot > -1)
            {
                result[0] = event.substr(0,firstDot);
                result[2] = event.substr(firstDot+1)
            }

            return result;
        });
    }

    on(eventsWithNamespace,selector,data,handler){
        let _this = this;

        [eventsWithNamespace,selector,data,handler] = this._refineParameters(eventsWithNamespace,selector,data,handler);

        let events = this._splitEvents(eventsWithNamespace);

        events.forEach(function(event){
            _this._assignEventListeners(event,selector,data,handler)
        });

        return this;
    }

    _refineParameters(eventsWithNamespace,selector,data,handler)
    {
        if(typeof data === 'function'){
            handler = data;
            data = null;
        }

        if(typeof selector === 'function'){
            handler = selector;
            selector = null;
        }else if (typeof selector === 'object'){
            data = selector;
            selector = null;
        }

        return [eventsWithNamespace,selector,data,handler];
    }


    _assignEventListeners(events,selector,data,handler)
    {
        let eventName = events[0];
        let eventSub = events[1];
        let eventNamespace = events[2];

        //if the event is not exist in our event list, then assign it directly to jquery
        if(!this.events.hasOwnProperty(eventName)){
            this.currentJqueryElement.on(eventName+eventNamespace,selector,data,handler);
            return null;
        }

        //if the element is not already saved on our elements then save it
        if(!this.elements.has(this.currentSelector))
        {
            this.elements.set(this.currentSelector,[]);
            // this.currentJqueryElement.on(`pointerdown.pointers pointermove.pointers pointercancel.pointers pointerup.pointers pointerleave.pointers`,
            this.currentJqueryElement.on(`pointerdown.pointers pointermove.pointers pointerup.pointers`,
                selector,data,this._handle.bind(this));
        }


        let event = new this.events[eventName](
            {
                ...{
                    name:eventName,
                    sub:eventSub,
                    namespace:eventNamespace ?? null,
                    selector:selector,
                    data:data,
                    handler:handler,
                    conditions:this.conditions,
                    jqueryElement: this.currentJqueryElement,
                    currentSelector:this.currentSelector,
                },
                ...this.options
            });

        this.elements.get(this.currentSelector).push(event);

        return event;
    }

    _handle(e)
    {
        this.elements.get(this.currentSelector).forEach(eventInstance => {
            eventInstance.handle(e);
        });
    }

    _reset(){
        this.conditions = [];
        this.options = {};

        return this;
    }

    select(element){
        this._reset();
        this.currentJqueryElement = $(element);
        this.currentSelector = element;

        return this;
    }

    off(eventWithNamespace,selector)
    {
        let eventArr = eventWithNamespace.split(".");
        let namespace = eventArr[1];
        let eventName = eventArr[0];

        //if the event is not exist in our event list, then assign it directly to jquery
        if(!this.events.hasOwnProperty(eventName)){
            this.currentJqueryElement.off(eventWithNamespace,selector);
            return this;
        }

        let pointerNamespace = "pointers-"+eventName;
        if(namespace)
        {
            pointerNamespace += "-"+namespace;
        }

        this.currentJqueryElement.off(`pointerenter.pointers pointerdown.pointers pointermove.pointers pointercancel.pointers pointerup.pointers pointerleave.pointers`,
            selector);

        return this;
    }

    /**
     *
     * @param {Number|function} condition
     */
    pointersCount(condition) {
        if(typeof condition === 'number')
        {
            this.conditions.push(function (){
                return this.currentPointers === condition;
            });
        }else{
            this.conditions.push(function (){
                return condition(this.currentPointers);
            });
        }

        return this;
    }

    /**
     *
     * @param callable
     */
    condition(callable){
        this.conditions.push(callable);
        return this;
    }

    setOptions(options)
    {
        this.options = options;
        return this;
    }

    getEvents()
    {
        return this.elements.get(this.currentSelector);
    }
}

let $pointer = new Pointers();
window.$p = $pointer.select.bind($pointer);

// window.$p = function(selector){
//     return (new Pointers()).select(selector);
// };
