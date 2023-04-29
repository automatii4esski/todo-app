declare module '*.svg' {
  export const ReactComponent: any;
}

declare module '*.jpg' {
  const ReactComponent: any;
  export default ReactComponent;
}
