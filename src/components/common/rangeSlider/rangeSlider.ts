import { RangeSliderHandle } from './rangeSlideHandle';

interface RangeSliderConfig {
    range: { min: number; max: number };
    width: number;
    handlesPositions: number[];
    parentContainer: HTMLDivElement;
}

export const BASE_CLASS_NAME = 'range-slider';

export class RangeSlider {
    public range: { min: number; max: number } = { min: 0, max: 100 };
    public width = 200;
    public scale: number;
    public parentElement!: HTMLDivElement;

    private handlesPositions: number[] = [];
    public handles: RangeSliderHandle[] = [];

    public barElement!: HTMLDivElement;
    public selectedRangeElement!: HTMLDivElement;

    constructor(config: RangeSliderConfig) {
        this.parentElement = config.parentContainer;
        this.range = config.range || this.range;
        this.width = config.width || this.width;
        this.handlesPositions = config.handlesPositions || this.handlesPositions;

        this.scale = this.width / (this.range.max - this.range.min);

        this.init();
    }

    private init() {
        this.parentElement.style.width = `${this.width}px`;
        this.parentElement.classList.add(BASE_CLASS_NAME);

        this.barElement = document.createElement('div');
        this.barElement.classList.add(`${BASE_CLASS_NAME}__bar`);
        this.parentElement.appendChild(this.barElement);

        this.handlesPositions.forEach((handle, index) => {
            const position = this.handlesPositions[index];
            const handleElement = new RangeSliderHandle(this, position, index);
            this.handles.push(handleElement);
        });

        this.handles.length >= 2 && this.createSelectedRangeElement();
    }

    private createSelectedRangeElement() {
        this.selectedRangeElement = document.createElement('div');
        this.selectedRangeElement.classList.add(`${BASE_CLASS_NAME}__selected-range`);
        this.selectedRangeElement.style.left = this.handlesPositions[0] * this.scale + 'px';
        this.selectedRangeElement.style.right = this.width - this.handlesPositions[1] * this.scale + 'px';
        this.parentElement.appendChild(this.selectedRangeElement);
    }

    public checkForHandleSwap() {
        if (this.handles[0].value >= this.handles[1].value) {
            const tempIndex = this.handles[0].index;
            this.handles[0].index = this.handles[1].index;
            this.handles[1].index = tempIndex;
            this.handles.reverse();
        }
    }

    get values(): number[] {
        const values: number[] = [];
        this.handles.forEach((handle) => {
            values.push(handle.value);
        });
        return values;
    }
}
