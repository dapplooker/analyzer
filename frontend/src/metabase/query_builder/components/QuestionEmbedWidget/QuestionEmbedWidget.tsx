import { t } from "ttag";

import type { ExportFormatType } from "metabase/dashboard/components/PublicLinkPopover/types";
import * as MetabaseAnalytics from "metabase/lib/analytics";
import { color } from "metabase/lib/colors";
import { useDispatch, useSelector } from "metabase/lib/redux";
import { publicQuestion } from "metabase/lib/urls";
import * as Urls from "metabase/lib/urls";
import {
  EmbedModal,
  EmbedModalContent,
} from "metabase/public/components/EmbedModal";
import { getMetadata } from "metabase/selectors/metadata";
import { getCardUiParameters } from "metabase-lib/parameters/utils/cards";
import type { Card } from "metabase-types/api";
import type { EmbedOptions } from "metabase-types/store";

import {
  createPublicLink,
  getChartAPI,
  deletePublicLink,
  updateEmbeddingParams,
  updateEnableEmbedding,
} from "../../actions";
import { HeaderButton } from "../../components/view/ViewHeader/ViewHeader.styled";

type QuestionEmbedWidgetProps = {
  className?: string;
  card: Card;
  isChartAPI?: boolean;
  onClose: () => void;
};
export const QuestionEmbedWidget = (props: QuestionEmbedWidgetProps) => {
  const { className, card, onClose, isChartAPI = false } = props;

  const metadata = useSelector(getMetadata);

  const dispatch = useDispatch();
  const createPublicQuestionLink = () => dispatch(createPublicLink(card));
  const deletePublicQuestionLink = () => dispatch(deletePublicLink(card));
  const updateQuestionEnableEmbedding = (enableEmbedding: boolean) =>
    dispatch(updateEnableEmbedding(card, enableEmbedding));
  const updateQuestionEmbeddingParams = (embeddingParams: EmbedOptions) =>
    dispatch(updateEmbeddingParams(card, embeddingParams));

  const getPublicQuestionUrl = (
    publicUuid: string,
    extension?: ExportFormatType,
  ) => publicQuestion({ uuid: publicUuid, type: extension });

  return (
    <EmbedModal onClose={onClose}>
      {({ embedType, goToNextStep }) => (
        <EmbedModalContent
          embedType={embedType}
          goToNextStep={goToNextStep}
          className={className}
          resource={card}
          resourceType="question"
          resourceParameters={getCardUiParameters(card, metadata)}
          onGetChartApi={() => getChartAPI(card)}
          onCreatePublicLink={createPublicQuestionLink}
          onDeletePublicLink={deletePublicQuestionLink}
          onUpdateEnableEmbedding={updateQuestionEnableEmbedding}
          onUpdateEmbeddingParams={updateQuestionEmbeddingParams}
          getPublicUrl={getPublicQuestionUrl}
          getChartApiEndPoint={({ public_uuid }, extension) =>
            Urls.chartApiEndPoint(public_uuid, extension)
          }
          isChartAPI={isChartAPI}
        />
      )}
    </EmbedModal>
  );
};
interface QuestionAPIWidgetTriggerProps {
  onClick: () => void;
}
export function QuestionAPIWidgetTrigger({
  onClick,
}: QuestionAPIWidgetTriggerProps) {
  return (
    <HeaderButton
      large
      labelBreakpoint="sm"
      className="hide sm-show"
      color={color("filter")}
      active={true}
      onClick={() => {
        MetabaseAnalytics.trackStructEvent(
          "Sharing / Embedding",
          "question",
          "Sharing Link Clicked",
        );
        onClick();
      }}
      aria-label={t`Get chart API`}
      data-metabase-event="View Mode; Open Filter Modal"
    >
      {t`API`}
    </HeaderButton>
  );
}
