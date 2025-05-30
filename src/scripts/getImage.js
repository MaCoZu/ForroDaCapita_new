// src/utils/getCmsImage.js
const imageImports = import.meta.glob('/src/assets/images/*.{jpg,jpeg,png,webp}');

export async function getImage(imagePath) {
  if (!imagePath) return null;

  // Extract clean filename (handles Windows paths too)
  const filename = imagePath.replace(/^.*[\\\/]/, '').trim();

  try {
    // Find the matching import
    for (const path in imageImports) {
      if (path.endsWith(filename)) {
        const module = await imageImports[path]();
        return module.default;
      }
    }
    console.warn(`Image not found: ${filename}`);
    return null;
  } catch (error) {
    console.error(`Error loading image ${filename}:`, error);
    return null;
  }
}