export const PHOTO_CATEGORIES = ['2025', '2024', '2023', 'travel', 'food'] as const;

const PHOTO_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

export const isPhotoFile = (filename: string) => {
  const parts = filename.toLowerCase().split('.');
  if (parts.length < 2) return false;
  const extension = `.${parts[parts.length - 1]}`;
  return PHOTO_EXTENSIONS.has(extension);
};
