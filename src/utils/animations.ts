import { gsap, Power2 } from 'gsap';

export const animateReject = (target: HTMLDivElement) => {
    gsap.timeline({
        onStart: () => target.classList.add('shake'),
    }).call(
        () => {
            target.classList.remove('shake');
        },
        undefined,
        0.5
    );
};

export const fadeOut = (targets: HTMLElement[], duration = 0.3) => {
    return new Promise((resolve) => {
        gsap.timeline({
            onComplete: resolve,
        }).to(targets, {
            opacity: 0,
            duration,
        });
    });
};

export const blink = (target: HTMLElement, opacity = 0, blinkDuration = 1) => {
    gsap.timeline({}).to(target, {
        opacity,
        duration: blinkDuration,
        repeat: -1,
        yoyo: true,
        yoyoEase: Power2.easeOut,
        ease: Power2.easeIn,
    });
};
