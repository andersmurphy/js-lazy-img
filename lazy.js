// Lazy load img tags with the lazy class
// src should contain the placeholder image
// data-src should  contain the image that is lazy loaded
// <img class="lazy" src="placeholder.jpg" data-src="image-to-be-lazy-loaded.jpg">

const lazyCallback = () => {
  const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"))

  if ("IntersectionObserver" in window) {
    // Lazy load images using Intersectionobserver
    const lazyImageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.map(entry => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target
            lazyImage.src = lazyImage.dataset.src
            lazyImage.classList.remove("lazy")
            lazyImageObserver.unobserve(lazyImage)}})})
    lazyImages.map(lazyImage => lazyImageObserver.observe(lazyImage))
  } else {
    // Don't lazy load the images if IntersectionObserver is not supported
    lazyImages.map(entry => {
      const lazyImage = entry.target
      lazyImage.src = lazyImage.dataset.src
      lazyImage.classList.remove("lazy")})}}

window.onload = function() {
  // If jquery present use ready instead of DOMcontentloaded
  if (window.jQuery) {
    // prevents race condition with jquery plugins
      $(document).ready(lazyCallback)
    } else {
      document.addEventListener("DOMContentLoaded", lazyCallback)}}
