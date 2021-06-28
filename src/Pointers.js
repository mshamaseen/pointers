import {Tap} from "./Events/Tap";
import {Press} from "./Events/Press";
import {Pan} from "./Events/Pan";
import {NthTap} from "./Events/NthTap";
import {Mouse} from "./Events/Mouse";

/**
 * @property {string|null} currentSelector - the current element selector
 * @property {string|null} currentJqueryElement - the current JQuery element
 * @property {Map} elements - All the element managed by Pointers
 * @property {Array} conditions - All the conditions that will be added to the next event
 * @property {Object} options - All the options that will be added to the next event
 * @property {Object} events - The current supported events
 */
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
            pan:Pan,
            mouse:Mouse
        };
    }

    /**
     * @description return [event name, event sub, event namespace]
     * @param eventsWithNamespace
     * @returns {Object}
     * @private
     */
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

    /**
     *
     * @param eventsWithNamespace
     * @param selector
     * @param data
     * @param handler
     * @returns {Pointers}
     */
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
            this.currentJqueryElement.on(eventName+"."+eventNamespace,selector,data,handler);
            return null;
        }

        //if the element is not already saved on our elements then save it
        if(!this.elements.has(this.currentSelector))
        {
            this.elements.set(this.currentSelector,[]);
            //don't send data here, it will only work for the first event
            this.currentJqueryElement.on(`pointerenter.pointers pointerdown.pointers pointermove.pointers pointerup.pointers pointercancel.pointers pointerleave.pointers`,this._handle.bind(this));
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

    select(element = null){
        this._reset();
        this.currentJqueryElement = $(element);
        this.currentSelector = element;

        return this;
    }

    /**
     *
     * @param eventsWithNamespace
     * @param selector
     * @returns {Pointers}
     */
    off(eventsWithNamespace,selector)
    {
        let _this = this;
        let eventStrings = this._splitEvents(eventsWithNamespace);
        let elementEvents = _this.getEvents();

        //remove the events from the element events
        eventStrings.forEach(eventString => {
            let eventName = eventString[0];
            let eventSub = eventString[1];
            let eventNamespace = eventString[2];
            //if the event is not exist in our event list, then assign it directly to jquery
            if(!_this.events.hasOwnProperty(eventName)){

                _this.currentJqueryElement.off(eventName+"."+eventNamespace,selector);
                return this;
            }

            //get the event index
            let eventIndex = elementEvents.findIndex(event => {
                //if event name space is not set then remove all that sub events
                if(eventNamespace)
                    return event.name === eventName && event.sub === eventSub && event.namespace === eventNamespace;
                else
                    return event.name === eventName && event.sub === eventSub;
            });

            //event not found
            if(eventIndex === -1)
                return;

            elementEvents.splice(eventIndex,1);
        });

        if(elementEvents.length === 0)
        {
            this.currentJqueryElement.off(`pointerenter.pointers pointerdown.pointers pointermove.pointers pointercancel.pointers pointerup.pointers pointerleave.pointers`,
                selector);

        }

        return this;
    }

    /**
     *
     * @param {Number} condition
     */
    pointersCount(condition) {
        this.conditions.push(function (e,pevent){
            return Object.keys(pevent.currentPointers).length === condition || e.pointerType === 'mouse';
        });
        return this;
    }

    /**
     *
     * @param callable
     * @return {this}
     */
    condition(callable){
        this.conditions.push(callable);
        return this;
    }

    /**
     *
     * @param {object} options
     * @returns {Pointers}
     */
    setOptions(options)
    {
        this.options = options;
        return this;
    }

    /**
     *
     * @returns {V}
     */
    getEvents()
    {
        return this.elements.get(this.currentSelector);
    }

    /**
     *
     * @param eventName
     * @param eventObject
     * @returns {Pointers}
     */
    addEvent(eventName,eventObject)
    {
        this.events[eventName] = eventObject;
        return this;
    }
}

let $pointer = new Pointers();
window.$p = $pointer.select.bind($pointer);
