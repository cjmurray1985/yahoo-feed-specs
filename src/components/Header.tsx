"use client";

import Header from "@/components/shared/layouts/Header";
import Logo from "@/components/shared/composites/Logo";

interface AppHeaderProps {
    onToggleLeftMenu?: () => void;
}

export default function AppHeader({ onToggleLeftMenu }: AppHeaderProps) {
    return (
        <Header
            onToggleLeftMenu={onToggleLeftMenu}
            logo={
                <Logo
                    imageSrc="/ypg-logo.svg"
                    imageWidth={300}
                    imageHeight={27}
                    altText="Yahoo Feed Specs"
                />
            }
            isGenericHeader={true}
        />
    );
}
