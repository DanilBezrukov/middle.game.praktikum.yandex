export function uploadImg(src: string, img: HTMLImageElement) {
  return new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
  });
}
