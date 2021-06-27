import {BaseEvent} from "./BaseEvent";

export class Mouse extends BaseEvent {
    constructor(attributes)
    {
        super(attributes);
        this.subs = [
            'down',
            'up',
            'move',
            'cancel',
            'leave',
            'enter'
        ];
    }

    handle(e)
    {
        super.handle(e);
    }

    pointerdown(e) {
        super.pointerdown(e);

        if(this.sub === 'down' && e.pointerType === 'mouse')
        {
            this.runIfOk(e);
        }
    }

    pointermove(e) {
        super.pointermove(e);

        if(this.sub === 'move' && e.pointerType === 'mouse')
        {
            this.runIfOk(e);
        }
    }

    pointerup(e) {
        if(this.sub === 'up' && e.pointerType === 'mouse')
        {
            this.runIfOk(e);
        }

        super.pointerup(e);
    }

    pointercancel(e) {
        if(this.sub === 'cancel' && e.pointerType === 'mouse')
        {
            this.runIfOk(e);
        }

        super.pointercancel(e);
    }

    pointerleave(e) {

        if(this.sub === 'leave' && e.pointerType === 'mouse')
        {
            this.runIfOk(e);
        }

        super.pointerleave(e);
    }

    pointerenter(e){
        if(this.sub === 'enter' && e.pointerType === 'mouse')
        {
            this.runIfOk(e);
        }
    }
}
