declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.md" {
  const content: any;
  export default content;
}

declare module "*.mdx" {
  const content: any;
  export default content;
}
