function carousel(config) {
    return {
        currentImage: 0,
        images: config.images || [],  // Get the images passed from the template
        next() {
            this.currentImage = (this.currentImage + 1) % this.images.length;
            this.updateSlide();
        },
        prev() {
            this.currentImage = (this.currentImage - 1 + this.images.length) % this.images.length;
            this.updateSlide();
        },
        goToSlide(index) {
            this.currentImage = index;
            this.updateSlide();
        },
        updateSlide() {
            this.$refs.slider.style.transform = `translateX(-${this.currentImage * 100}%)`;
        },
        startAutoScroll() {
            setInterval(() => {
                this.next();
            }, 5000);  // Change slide every 5 seconds
        }
    }
}
