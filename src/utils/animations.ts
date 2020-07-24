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