import PropTypes from "prop-types";
import { useState } from "react";
import { connect } from "react-redux";
import { t } from "ttag";
import _ from "underscore";

import { getAdminPaths } from "metabase/admin/app/selectors";
import EntityMenu from "metabase/components/EntityMenu";
import LogoIcon from "metabase/components/LogoIcon";
import Modal from "metabase/components/Modal";
import { color } from "metabase/lib/colors";
import { capitalize } from "metabase/lib/formatting";
import { useSelector } from "metabase/lib/redux";
import * as Urls from "metabase/lib/urls";
import { getSetting } from "metabase/selectors/settings";
import {
  getApplicationName,
  getIsWhiteLabeling,
} from "metabase/selectors/whitelabel";

import { useHelpLink } from "./useHelpLink";

// generate the proper set of list items for the current user
// based on whether they're an admin or not
const mapStateToProps = state => ({
  adminItems: getAdminPaths(state),
});

export default connect(mapStateToProps)(ProfileLink);

function ProfileLink({ adminItems, onLogout }) {
  const [modalOpen, setModalOpen] = useState(null);
  const version = useSelector(state => getSetting(state, "version"));
  const applicationName = useSelector(getApplicationName);
  const { tag, date, ...versionExtra } = version;
  const helpLink = useHelpLink();

  const openModal = modalName => {
    setModalOpen(modalName);
  };

  const closeModal = () => {
    setModalOpen(null);
  };

  const generateOptionsForUser = () => {
    const showAdminSettingsItem = adminItems?.length > 0;

    return [
      // {
      //   title: t`Account settings`,
      //   icon: null,
      //   link: Urls.accountSettings(),
      //   event: `Navbar;Profile Dropdown;Edit Profile`,
      // },
      isAdmin && {
        title: t`Admin settings`,
        icon: null,
        link: "/admin",
        event: `Navbar;Profile Dropdown;Enter Admin`,
      },
      {
        title: t`My Profile`,
        icon: null,
        link: 'https://dapplooker.com/user/profile',
        externalLink: true,
        event: `Navbar;Profile Dropdown;About ${tag}`,
      },
      {
        title: t`My Plan`,
        icon: null,
        link: 'https://dapplooker.com/pricing',
        externalLink: true,
        event: `Navbar;Profile Dropdown;About ${tag}`,
      },
      {
        title: t`API Keys`,
        icon: null,
        link: 'https://dapplooker.com/user/api',
        externalLink: true,
        event: `Navbar;Profile Dropdown;About ${tag}`,
      },
      {
        title: t`Documentation`,
        icon: null,
        link: 'https://docs.dapplooker.com/',
        externalLink: true,
        event: `Navbar;Profile Dropdown;About ${tag}`,
      },
      {
        title: t`FAQ`,
        icon: null,
        link: 'https://dapplooker.com/pricing#faq',
        externalLink: true,
        event: `Navbar;Profile Dropdown;About ${tag}`,
      },
     
      // {
      //   title: t`Sign out`,
      //   icon: null,
      //   link: "auth/logout",
      //   event: `Navbar;Profile Dropdown;Logout`,
      // },
    ];
  };

  // show trademark if application name is not whitelabeled
  const isWhiteLabeling = useSelector(getIsWhiteLabeling);
  const showTrademark = !isWhiteLabeling;
  return (
    <div>
      <EntityMenu
        tooltip={t`Settings`}
        items={generateOptionsForUser()}
        triggerIcon="gear"
        triggerProps={{
          color: color("text-medium"),
          hover: {
            backgroundColor: color("brand"),
            color: color("text-white"),
          },
        }}
        // I've disabled this transition, since it results in the menu
        // sometimes not appearing until content finishes loading on complex
        // dashboards and questions #39303
        // TODO: Try to restore this transition once we upgrade to React 18 and can prioritize this update
        transitionDuration={0}
      />
      {modalOpen === "about" ? (
        <Modal small onClose={closeModal}>
          <div className="px4 pt4 pb2 text-centered relative">
            <div className="text-brand pb2">
              <LogoIcon height={48} />
            </div>
            <h2
              style={{ fontSize: "1.75em" }}
              className="text-dark"
            >{t`Thanks for using ${applicationName}!`}</h2>
            <div className="pt2">
              <h3 className="text-dark mb1">
                {t`You're on version`} {tag}
              </h3>
              <p className="text-medium text-bold">
                {t`Built on`} {date}
              </p>
              {!/^v\d+\.\d+\.\d+$/.test(tag) && (
                <div>
                  {_.map(versionExtra, (value, key) => (
                    <p key={key} className="text-medium text-bold">
                      {capitalize(key)}: {value}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
          {showTrademark && (
            <div
              style={{ borderWidth: "2px" }}
              className="p2 h5 text-centered text-medium border-top"
            >
              <span className="block">
                <span className="text-bold">Metabase</span>{" "}
                {t`is a Trademark of`} Metabase, Inc
              </span>
              <span>{t`and is built with care by a team from all across this pale blue dot.`}</span>
            </div>
          )}
        </Modal>
      ) : null}
    </div>
  );
}

ProfileLink.propTypes = {
  adminItems: PropTypes.array,
  onLogout: PropTypes.func.isRequired,
};