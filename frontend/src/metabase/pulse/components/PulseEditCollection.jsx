/* eslint-disable react/prop-types */
import React from "react";
import { t } from "ttag";

import CollectionSelect from "metabase/containers/CollectionSelect";
import { CollectionSelectContainer } from "./PulseEditCollection.styled";

export default class PulseEditCollection extends React.Component {
  render() {
    const { pulse, setPulse } = this.props;
    return (
      <div>
        <h2>{t`Which collections should this report live in?`}</h2>

        <CollectionSelectContainer>
          <CollectionSelect
            value={pulse.collection_id}
            onChange={collection_id =>
              setPulse({
                ...pulse,
                collection_id,
              })
            }
          />
        </CollectionSelectContainer>
      </div>
    );
  }
}
