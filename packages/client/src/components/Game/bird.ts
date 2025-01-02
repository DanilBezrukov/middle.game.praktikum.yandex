import { IBird } from "@/components/Game/type";

export function updateBirdPosition(bird: IBird, scale: number): void {
  bird.velocity += bird.gravity * scale;
  bird.y += bird.velocity * scale;
}

export function birdJump(bird: IBird): void {
  bird.velocity = bird.lift;
}
