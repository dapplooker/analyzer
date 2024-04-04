import { t } from "ttag";

import EditableText from "metabase/core/components/EditableText";
import Link from "metabase/core/components/Link";
import { useDispatch } from "metabase/lib/redux";
import * as Urls from "metabase/lib/urls";
import { PLUGIN_MODERATION, PLUGIN_CACHING } from "metabase/plugins";
import { onCloseQuestionInfo } from "metabase/query_builder/actions";
import { QuestionActivityTimeline } from "metabase/query_builder/components/QuestionActivityTimeline";
import { Icon } from "metabase/ui";
import type Question from "metabase-lib/Question";

import ModelCacheManagementSection from "../ModelCacheManagementSection";

import {
  Root,
  ContentSection,
  HeaderContainer,
  CrossIconContainer,
} from "./QuestionInfoSidebar.styled";

interface QuestionInfoSidebarProps {
  question: Question;
  onSave: (question: Question) => Promise<Question>;
}

export const QuestionInfoSidebar = ({
  question,
  onSave,
}: QuestionInfoSidebarProps) => {
  const description = question.description();
  const canWrite = question.canWrite();
  const isDataset = question.isDataset();
  const isPersisted = isDataset && question.isPersisted();
  const dispatch = useDispatch();
  const hasCacheSection = PLUGIN_CACHING.hasQuestionCacheSection(question);

  const handleSave = (description: string | null) => {
    if (question.description() !== description) {
      onSave(question.setDescription(description));
    }
  };

  const handleUpdateCacheTTL = (cache_ttl: number | undefined) => {
    if (question.cacheTTL() !== cache_ttl) {
      return onSave(question.setCacheTTL(cache_ttl));
    }
  };

  return (
    <Root>
      <ContentSection>
        <HeaderContainer>
          <CrossIconContainer onClick={() => dispatch(onCloseQuestionInfo())}>
            <Icon name="close" color="text-light" />
          </CrossIconContainer>
        </HeaderContainer>
        <HeaderContainer>
          <h3>{t`About`}</h3>
          {question.isDataset() && (
            <Link
              variant="brand"
              to={Urls.modelDetail(question.card())}
            >{t`Model details`}</Link>
          )}
        </HeaderContainer>
        <EditableText
          initialValue={description}
          placeholder={
            !description && !canWrite ? t`No description` : t`Add description`
          }
          isOptional
          isMultiline
          isMarkdown
          isDisabled={!canWrite}
          onChange={handleSave}
        />
        <PLUGIN_MODERATION.QuestionModerationSection question={question} />
      </ContentSection>

      {isPersisted && (
        <ContentSection extraPadding>
          <ModelCacheManagementSection model={question} />
        </ContentSection>
      )}

      {hasCacheSection && (
        <ContentSection extraPadding>
          <PLUGIN_CACHING.QuestionCacheSection
            question={question}
            onSave={handleUpdateCacheTTL}
          />
        </ContentSection>
      )}
      <ContentSection extraPadding>
        <QuestionActivityTimeline question={question} />
      </ContentSection>
    </Root>
  );
};