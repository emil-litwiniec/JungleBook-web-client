import { gsap } from "gsap";

export const animateReject = (target: HTMLDivElement) => {
    gsap.timeline({
        onStart: () => target.classList.add("shake"),
    }).call(
        () => {
            target.classList.remove("shake");
        },
        undefined,
        0.5
    );
}

export const fadeOut = (target: HTMLElement, duration = 0.3) => {
    return new Promise(resolve => {
        gsap.timeline({
            onComplete: resolve
        })
        .to(target, {
            opacity: 0,
            duration
        })
    })
}