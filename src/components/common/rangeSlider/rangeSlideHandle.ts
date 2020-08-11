import { RangeSlider, BASE_CLASS_NAME } from './rangeSlider';

export class RangeSliderHandle {
    private readonly parentSlider!: RangeSlider;
    private position!: number;
    public index!: number;

    private valueElement = document.createElement('div');
    private handleElement = document.createElement('button');
    private handleContainerElement = document.createElement('div');

    private limit = {
        min: 0,
        max: 0,
    };

    constructor(parentSlider: RangeSlider, position: number, index: number) {
        this.parentSlider = parentSlider;
        this.position = position;
        this.index = index;

        this.limit.max = parentSlider.width;

        this.init();
    }

    init() {
        this.createHandleContainerElement();
        this.createHandleElement();
        this.createValueElement();

        this.handleElement.addEventListener('mousedown', (event) => this.onMouseDown(event));
    }

    private createHandleElement() {
        this.handleElement.classList.add(`${BASE_CLASS_NAME}__handle`);
        this.handleContainerElement.appendChild(this.handleElement);
    }

    private createValueElement() {
        this.valueElement.classList.add(`${BASE_CLASS_NAME}__value`);
        this.valueElement.innerHTML = `${this.value}`;
        this.handleContainerElement.appendChild(this.valueElement);
    }

    private createHandleContainerElement() {
        this.handleContainerElement.classList.add(`${BASE_CLASS_NAME}__handle-container`);
        this.handleContainerElement.style.left =
            (this.position - this.parentSlider.range.min) * this.parentSlider.scale + 'px';
        this.parentSlider.parentElement.appendChild(this.handleContainerElement);
    }

    private onMouseDown(event: MouseEvent) {
        event = event || window.event;
        event.preventDefault();

        document.onmousemove = (event) => this.onMouseMove(event);
        document.onmouseup = (event) => this.onMouseUp(event);
    }

    get isLeftSideHandle() {
        return this.index < this.parentSlider.handles.length - 1;
    }

    get isRightSideHandle() {
        return this.index > 0;
    }

    private onMouseMove(event: MouseEvent) {
        event = event || window.event;
        event.preventDefault();

        this.moveHandle(event);
    }

    private onMouseUp(event: MouseEvent) {
        event = event || window.event;
        event.preventDefault();

        document.onmousemove = null;
        document.onmouseup = null;

        this.moveHandle(null);
    }

    private moveHandle(event: MouseEvent | null) {
        setTimeout(() => {
            if (this.currentPosition < this.limit.min) {
                const xPosition = this.limit.min;
                this.handleContainerElement.style.left = xPosition + 'px';
                this.updateSelectedRange(xPosition);
            } else if (this.currentPosition > this.limit.max) {
                const xPosition = this.limit.max;
                this.handleContainerElement.style.left = xPosition + 'px';
                this.updateSelectedRange(xPosition);
            } else {
                if (event !== null) {
                    const xPosition = event.movementX + this.currentPosition;
                    this.handleContainerElement.style.left = xPosition + 'px';
                    this.updateSelectedRange(xPosition);
                }
            }

            this.valueElement.innerHTML = `${this.value}`;
            this.parentSlider.checkForHandleSwap();
        }, 100);
    }

    private updateSelectedRange(targetPosition: number) {
        if (this.isLeftSideHandle) {
            this.parentSlider.selectedRangeElement.style.left = targetPosition + 'px';
        } else if (this.isRightSideHandle) {
            this.parentSlider.selectedRangeElement.style.right = this.limit.max - targetPosition + 'px';
        }
    }

    get value(): number {
        const value = parseInt(this.handleContainerElement.style.left) / this.parentSlider.scale;

        if (value < 0) {
            return 0;
        }

        if (value > this.parentSlider.range.max) {
            return this.parentSlider.range.max;
        }
        return Math.round(value);
    }

    get currentPosition() {
        return parseInt(this.handleContainerElement.style.left);
    }
}
