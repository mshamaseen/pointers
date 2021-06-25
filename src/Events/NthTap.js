import {BaseEvent} from "./BaseEvent";

export class NthTap extends BaseEvent {
    constructor(attributes)
    {
        super(attributes);
        this.pressingThreshold = 250;
        this.maxTimeBetweenTaps = 300;
        this.tapCount = 0;

    }

    handle(e)
    {
        super.handle(e);
    }

    pointerup(e) {
        let _this = this;
        if(this.timeSinceFirstInteraction() <= this.pressingThreshold)
        {
            this.tapCount++;
            let currentCount = this.tapCount;

            setTimeout(function() {
                if(currentCount === _this.tapCount)
                    _this.tapCount = 0;
            },this.maxTimeBetweenTaps);

            if(this.tapCount === Number(this.sub))
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
