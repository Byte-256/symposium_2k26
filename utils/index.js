export const createPageUrl = (page) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/symposium_2k26' : '';
  const pageLower = page.toLowerCase();
  if (pageLower === 'home') {
    return basePath || '/';
  }
  return `${basePath}/${pageLower}`;
};
