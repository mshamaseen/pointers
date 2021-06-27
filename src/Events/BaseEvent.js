/**
 *
 */
export class BaseEvent {

    /**
     *
     * @param attributes
     */
    constructor(attributes)
    {
        this._setAttributes(attributes);

        //assigned inside the event
        this.currentPointers = {};
        this.startingCoordinates = null;
        this.firstInteractionAt = null;
        this.hasMoved = false;
        this.movingThreshold = 2;
        this.triggeredAt = null;

        //this will be true if the event succeed on its main propose
        this.succeed = false;

        this.subs = [];
    }

    _setAttributes(attributes)
    {
        let _this = this;
        Object.keys(attributes).forEach(key => {
            _this[key] = attributes[key];
        })
    }

    handle(e)
    {
        if(typeof this[e.type] === "function")
        {
            return this[e.type](e);
        }
    }

    validateConditions(e)
    {
        let _this = this;
        return !this.conditions.find(condition => {
            // console.info(!condition.bind(_this)(e));
            //if the callback return false then stop it
            return !condition(e,_this);
        })
    }

    pointerdown(e)
    {
        if(Object.keys(this.currentPointers).length === 0)
        {
            this.firstInteractionAt = this._getTime();
            this.startingCoordinates = {};
            this.startingCoordinates.x = e.clientX;
            this.startingCoordinates.y = e.clientY;
        }

        this.currentPointers[e.pointerId] = e;
    }

    /**
     * Always have this run after the child pointerup
     * @param e
     */
    pointerup(e)
    {
        this.reset(e);
    }

    pointermove(e)
    {
        if(!this.hasMoved && this.startingCoordinates && this.distance(e.clientX, e.clientY) >= this.movingThreshold)
        {
            this.hasMoved = true;
        }
    }

    pointerleave(e){
        this.reset(e);
    }

    pointercancel(e){
        this.reset(e);
    }

    pointerenter(e){

    }

    reset(e){
        delete this.currentPointers[e.pointerId];

        if(Object.keys(this.currentPointers).length === 0)
        {
            this.startingCoordinates = null;
            this.firstInteractionAt = null;
            this.hasMoved = null;
            this.succeed = false;
        }
    }

    distance(x,y)
    {
        return Math.sqrt(
            Math.pow(this.startingCoordinates.x - x,2) + Math.pow(this.startingCoordinates.y - y,2)
        )
    }

    timeSinceFirstInteraction()
    {
        if(!this.firstInteractionAt)
            return null;

        let currentTime = this._getTime();

        return currentTime - this.firstInteractionAt;
    }

    /**
     * This command run the handler if it succeed the conditions
     * @param e
     */
    runIfOk(e)
    {
        if(this.validateConditions(e)){

            this.triggeredAt = this._getTime();
            e.pevent = {...this};
            e.data = this.data;

            if(this.selector)
            {
                let currentTarget = $(this.selector)[0];
                if(e.target == currentTarget)
                {
                    e.currentTarget = currentTarget;
                    this.handler.bind(currentTarget)(e);
                }
            }else
                this.handler.bind($(this.currentSelector)[0])(e);
        }
    }

    getAvailableSubs()
    {
        return this.subs;
    }

    _getTime()
    {
        return (new Date()).getTime();
    }
}
