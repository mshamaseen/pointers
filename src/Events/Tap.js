import {BaseEvent} from "./BaseEvent";

export class Tap extends BaseEvent {
    constructor(attributes)
    {
        super(attributes);
        this.pressingThreshold = 250;
    }

    handle(e)
    {
        super.handle(e);
    }

    pointerup(e) {
        if(this.timeSinceFirstInteraction() <= this.pressingThreshold)
        {
            this.succeed = true;
            this.runIfOk(e);
        }

        super.pointerup(e);
    }
}
