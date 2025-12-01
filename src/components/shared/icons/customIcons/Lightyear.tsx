import { IconVariant, SvgIconProps } from "@yahoo/uds-icons/types";
const LightyearIcon = (props: SvgIconProps) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14,0H2C.9,0,0,.9,0,2v12c0,1.1.9,2,2,2h12c1.1,0,2-.9,2-2V2c0-1.1-.9-2-2-2ZM5.74,11.52h-2.24V3h2.24v8.52ZM10.18,13.5h-2.19l.9-2.15-1.25-2.98-1.25-2.98h2.24l1.34,3.47,1.35-3.47h2.18l-3.32,8.11Z"
      fill="#232a31"
    />
  </svg>
);

LightyearIcon.metadata = {
  name: "LightyearIcon",
  isSvgIcon: true,
  variants: ["outline", "fill"] as IconVariant[],
};

export default LightyearIcon;
