import React from "react";
import PropTypes from "prop-types";
import AccountHeader from "../AccountHeader";
import { AccountContent } from "./AccountLayout.styled";

const propTypes = {
  ...AccountHeader.propTypes,
  children: PropTypes.node,
};

const AccountLayout = ({ children, ...props }) => {
  const isAdmin = props?.user.is_superuser;

  if (!isAdmin) {
    return null;
  }

  return (
    <div>
      <AccountHeader {...props} />
      <AccountContent>{children}</AccountContent>
    </div>
  );
};

AccountLayout.propTypes = propTypes;

export default AccountLayout;
