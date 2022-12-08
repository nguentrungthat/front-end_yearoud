export function Lazy(items) {
    let observer = new IntersectionObserver((entries) => {
        for (let entry of entries) {
            if (entry.isIntersecting) {
                Load(entry.target);
            }
        }
    });
    for (let item of items) {
        observer.observe(item);
    }
}

function Load(img) {
    const url = img.getAttribute('lazy-src');
    img.setAttribute('src', url);
}
