import { Box as UdsBox, BoxProps } from "@yahoo/uds";

const Box = ({ children, ...props }: BoxProps) => (
  <UdsBox {...props}>{children}</UdsBox>
);

export default Box;
export { type BoxProps };
