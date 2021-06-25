import {BaseEvent} from "./BaseEvent";

export class Press extends BaseEvent {
    constructor(attributes)
    {
        super(attributes);
        this.pressingThreshold = 251;
    }

    handle(e)
    {
        super.handle(e);
    }

    pointerdown(e) {
        super.pointerdown(e);

        let _this = this;
        let firstInteractionAt = this.firstInteractionAt;
        setTimeout(function() {
            if(firstInteractionAt === _this.firstInteractionAt)
            {
                _this.succeed = true;

                if(_this.sub === 'press' || _this.sub === null)
                    _this.runIfOk(e);
            }
        },this.pressingThreshold);
    }

    pointerup(e) {
        if(this.succeed && this.sub === 'up')
            this.runIfOk(e);

        super.pointerup(e);
    }

    waitingTime()
    {
        return 0;
    }
}
