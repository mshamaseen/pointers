import {BaseEvent} from "./BaseEvent";

export class NthTap extends BaseEvent {
    constructor(attributes)
    {
        super(attributes);
        this.pressingThreshold = 250;
        this.maxTimeBetweenTaps = 300;
        this._tapCount = 0;
        this.sub = 2;
    }

    handle(e)
    {
        super.handle(e);
    }

    pointerup(e) {
        let _this = this;
        if(this.timeSinceFirstInteraction() <= this.pressingThreshold)
        {
            this._tapCount++;
            let currentCount = this._tapCount;

            setTimeout(function() {
                if(currentCount === _this._tapCount)
                    _this._tapCount = 0;
            },this.maxTimeBetweenTaps);

            if(this._tapCount === Number(this.sub))
                this.runIfOk(e);
        }

        super.pointerup(e);
    }

    //maximum waiting time for this event
    waitingTime()
    {
        return this.maxTimeBetweenTaps * Number(this.sub);
    }
}
