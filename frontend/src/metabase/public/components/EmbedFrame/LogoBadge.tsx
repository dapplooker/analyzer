import React from "react";
import { t, jt } from "ttag";
import LogoIcon from "metabase/components/LogoIcon";
import {
  MetabaseLink,
  MetabaseName,
  Message,
  Variant,
} from "./LogoBadge.styled";

function LogoBadge({
  dark,
  variant = "default",
}: {
  dark: boolean;
  variant?: Variant;
}) {
  const logoSize = variant === "large" ? 42 : 28;
  const Metabase = (
    <MetabaseName key="metabase" isDark={dark} variant={variant}>
      {t`DappLooker`}
    </MetabaseName>
  );
  return (
    <MetabaseLink
      href="https://dapplooker.com/"
      target="_blank"
      variant={variant}
    >
      <LogoIcon height={logoSize} dark={dark} />
      <Message variant={variant}>{jt`Powered by ${Metabase}`}</Message>
    </MetabaseLink>
  );
}

export default LogoBadge;
