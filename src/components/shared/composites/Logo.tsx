import Image from "next/image";
import Link from "next/link";

import Box from "@/components/shared/primitives/Box";

export interface ILogoProps {
  href?: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  altText?: string;
}

// TODO: Do I need the transitions?
//transition-all duration-300
const Logo = ({
  href = "/",
  imageSrc,
  imageWidth,
  imageHeight,
  altText = "",
}: ILogoProps) => {
  return (
    <Box className="shrink-0 pl-[10px]">
      <Link href={href} className="flex items-center">
        <Image
          src={imageSrc}
          width={imageWidth}
          height={imageHeight}
          alt={altText}
          role="img"
        />
      </Link>
    </Box>
  );
};

export default Logo;
