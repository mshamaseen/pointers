import {BaseEvent} from "./BaseEvent";

export class Pan extends BaseEvent {
    constructor(attributes)
    {
        super(attributes);
        this.pressingThreshold = 251;
        this.subs = [
            'start',
            'move',
            'end',
            'cancel',
        ];
    }

    handle(e)
    {
        super.handle(e);
    }

    pointermove(e) {
        if(!this.hasMoved && this.startingCoordinates && this.distance(e.clientX, e.clientY) >= this.moveingThreshold)
        {
            this.hasMoved = true;
            this.succeed = true;

            if(this.sub === 'start')
            {
                this.runIfOk(e);
            }
        }

        if(this.hasMoved && (this.sub === null || this.sub === 'move'))
        {
            this.runIfOk(e);
        }
    }

    pointerup(e) {
        if(this.hasMoved && this.sub === 'end')
        {
            this.runIfOk(e);
        }

        super.pointerup(e);
    }

    pointercancel(e){
        if(this.hasMoved && this.sub === 'cancel')
        {
            this.runIfOk(e);
        }

        super.pointercancel(e);
    }

    waitingTime()
    {
        return 0;
    }
}
