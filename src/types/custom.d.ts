declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.png" {
  import React = require("react");
  export const ReactComponent: React.FC<any>;
  const src: string;
  export default src;
}

declare module "*.jpg" {
  import React = require("react");
  export const ReactComponent: React.FC<any>;
  const src: string;
  export default src;
}

declare module "*.webp" {
  import React = require("react");
  export const ReactComponent: React.FC<any>;
  const src: string;
  export default src;
}