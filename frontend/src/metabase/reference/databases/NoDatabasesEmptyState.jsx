import React from "react";
import { t } from "ttag";

import AdminAwareEmptyState from "metabase/components/AdminAwareEmptyState";

const NoDatabasesEmptyState = user => (
  <AdminAwareEmptyState
    title={t`DappLooker is fun with Data`}
    adminMessage={t`Your databases will appear here once you connect one`}
    message={t`Databases will appear here once your admins have added some`}
    image="app/assets/img/databases-list"
    adminAction={t`Connect a database`}
    adminLink="/admin/databases/create"
    user={user}
  />
);

export default NoDatabasesEmptyState;
