import {
  HStack as UdsHStack,
  type HStackProps as _HStackProps,
} from "@yahoo/uds";

const HStack = ({ children, ...props }: _HStackProps) => (
  <UdsHStack {...props}>{children}</UdsHStack>
);

export default HStack;
