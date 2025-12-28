export const optimizeImage = (url: string | undefined): string => {
    if (!url) return '';
    if (!url.includes('cloudinary')) return url;

    // If already has transformation parameters, assumes they are correct/sufficient or we append?
    // Cloudinary URLs usually: .../upload/v1234/id.jpg
    // We want: .../upload/f_auto,q_auto/v1234/id.jpg
    // But safely.

    // Simplest approach: Use split/join if strictly standard structure, 
    // OR just append parameters if using URL Gen SDK (but we are using string manipulation here for speed/simplicity without refactoring everything to SDK objects).

    // If it already has f_auto or q_auto, leave it.
    if (url.includes('f_auto') && url.includes('q_auto')) return url;

    // Insert manually after /upload/
    return url.replace('/upload/', '/upload/f_auto,q_auto/');
};
