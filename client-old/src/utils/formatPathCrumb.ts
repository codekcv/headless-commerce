const formatPathCrumb = (path: string): string[] => {
  const breadcrumb = path
    .split('/')
    .slice(1)
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1));

  return breadcrumb;
};

export default formatPathCrumb;
