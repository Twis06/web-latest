import { map, clamp } from './math';

export interface Bounds {
  top: number;
  bottom: number;
  wh: number;
  ww: number;
}

export const clientRect = (element: HTMLElement, scrollY: number = 0): Bounds => {
  const bounds = element.getBoundingClientRect();
  return {
    top: bounds.top + scrollY,
    bottom: bounds.bottom + scrollY,
    wh: window.innerHeight,
    ww: window.innerWidth,
  };
};

interface TrackConfig {
  bounds?: [number, number];
  top?: 'top' | 'center' | 'bottom';
  bottom?: 'top' | 'center' | 'bottom';
}

export class Track {
  element: HTMLElement;
  config: Required<TrackConfig>;
  bounds: Bounds;
  value = 0;
  value1 = 0;
  value2 = 0;
  scrollY = 0;
  inView = true;

  constructor(element: HTMLElement, config: TrackConfig = {}) {
    this.element = element;
    this.config = {
      bounds: config.bounds || [0, 1],
      top: config.top || 'bottom',
      bottom: config.bottom || 'top',
    };
    this.bounds = { top: 0, bottom: 0, wh: 0, ww: 0 };
    this.resize();
  }

  resize() {
    this.bounds = computeBounds(this.element, this.config, this.scrollY);
  }

  render(scrollY: number = 0) {
    this.scrollY = scrollY;

    this.value = clamp(
      0,
      1,
      map(scrollY, this.bounds.top, this.bounds.bottom, this.config.bounds[0], this.config.bounds[1])
    );

    this.value1 = clamp(0, 1, map(this.value, 0, 0.5, 1, 0));
    this.value2 = clamp(0, 1, map(this.value, 0.5, 1, 0, 1));

    return this.value;
  }
}

function computeBounds(el: HTMLElement, config: Required<TrackConfig>, scrollY: number = 0) {
  const bounds = clientRect(el, scrollY);
  const adjustPosition = (position: number, offset: string) => {
    switch (offset) {
      case 'center':
        return position - bounds.wh / 2;
      case 'bottom':
        return position - bounds.wh;
      default:
        return position;
    }
  };

  return {
    ...bounds,
    top: adjustPosition(bounds.top, config.top),
    bottom: adjustPosition(bounds.bottom, config.bottom),
  };
}

export class ImageTransform extends Track {
  img: HTMLImageElement | null = null;
  imgWrap: HTMLElement | null = null;

  constructor(element: HTMLElement, config: TrackConfig = {}) {
    super(element, config);
    this.create();
  }

  create() {
    this.img = this.element.querySelector('img') as HTMLImageElement;
    this.imgWrap = this.img?.parentElement as HTMLElement;
  }

  render(scrollY: number = 0) {
    super.render(scrollY);
    this.transform();
    return this.value;
  }

  transform() {
    if (!this.img || !this.imgWrap) return;
    
    this.img.style.transform = `scale(${1 + this.value * 0.2})`;
    this.imgWrap.style.clipPath = `inset(
      ${this.value2 * 100}% 0 
      ${this.value1 * 100}% 0
    )`;
  }
}
