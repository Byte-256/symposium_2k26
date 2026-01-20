export const createPageUrl = (page) => {
  const pageLower = page.toLowerCase();
  if (pageLower === 'home') {
    return '/';
  }
  return `/${pageLower}`;
};
