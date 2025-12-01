import React from "react";
import Box from "@/components/shared/primitives/Box";
import HStack from "@/components/shared/primitives/HStack";
import IconButton from "@/components/shared/primitives/IconButton";
import {
  // Bolt,
  // MagnifyingGlass,
  // Star,
  ThreeLinesSpread,
} from "@/components/shared/icons/Icon";

import { cn } from "@/components/shared/utils/cn";

export interface IHeaderProps {
  isGenericHeader?: boolean;
  logo?: React.ReactElement;
  onToggleLeftMenu?: () => void;
  profileButton?: React.ReactElement;
  globalSearch?: React.ReactElement;
  zIndexHeader?: number;
  zIndexContent?: number;
}

interface IToggleLeftMenuButtonProps {
  onToggleLeftMenu?: () => void;
}

const ToggleLeftMenuButton = ({
  onToggleLeftMenu,
}: IToggleLeftMenuButtonProps) => {
  return (
    <Box className="lg:hidden">
      <IconButton
        id="toggle-left-menu-button"
        name={ThreeLinesSpread}
        variant="tertiary"
        onClick={onToggleLeftMenu}
        size="sm"
      />
    </Box>
  );
};

// const QuickCreateButton = () => {
//   return (
//     <Box display="block">
//       <IconButton name={Bolt} variant="secondary" size="sm" />
//     </Box>
//   );
// };

// const FavoritesButton = () => {
//   return (
//     <Box display="block">
//       <IconButton name={Star} variant="secondary" size="sm" />
//     </Box>
//   );
// };

const Header = ({
  isGenericHeader = true,
  logo,
  onToggleLeftMenu,
  profileButton,
  globalSearch,
  zIndexHeader = 20,
  zIndexContent = 10,
}: IHeaderProps) => {
  return (
    <header
      className={cn(
        "p-4.5 sticky top-0 left-0 bg-white border-b border-gray-3",
      )}
      style={{ zIndex: zIndexHeader }}
    >
      <HStack
        justifyContent="space-between"
        alignItems="center"
        className="w-full h-[27px]"
        style={{ zIndex: zIndexContent }}
      >
        {/* Left side with logo and toggle button */}
        <HStack alignItems="center" gap="4">
          <ToggleLeftMenuButton onToggleLeftMenu={onToggleLeftMenu} />
          {logo ?? <div></div>}
        </HStack>

        <HStack
          alignItems="center"
          justifyContent="flex-end"
          spacingStart="6"
          gap="4"
          className="flex-1"
        >
          {isGenericHeader && (
            <>
              {globalSearch}
              {/* <QuickCreateButton />
              <FavoritesButton /> */}
            </>
          )}
          {profileButton}
        </HStack>
      </HStack>
    </header>
  );
};

export default Header;
