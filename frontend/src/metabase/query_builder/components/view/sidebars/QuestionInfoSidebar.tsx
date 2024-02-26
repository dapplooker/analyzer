import React from "react";
import { t } from "ttag";

import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import EditableText from "metabase/core/components/EditableText";

import { PLUGIN_MODERATION, PLUGIN_CACHING } from "metabase/plugins";

import MetabaseSettings from "metabase/lib/settings";
import * as Urls from "metabase/lib/urls";

import QuestionActivityTimeline from "metabase/query_builder/components/QuestionActivityTimeline";

import type { Card } from "metabase-types/types/Card";

import Icon from "metabase/components/Icon";
import { onCloseQuestionInfo } from "metabase/query_builder/actions";
import Question from "metabase-lib/Question";

import ModelCacheManagementSection from "./ModelCacheManagementSection";
import {
  Root,
  ContentSection,
  HeaderContainer,
  HeaderLink,
} from "./QuestionInfoSidebar.styled";

interface QuestionInfoSidebarProps {
  question: Question;
  onSave: (card: Card) => Promise<Question>;
}

const CustomRemoveButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
`;

export const QuestionInfoSidebar = ({
  question,
  onSave,
}: QuestionInfoSidebarProps) => {
  const description = question.description();
  const canWrite = question.canWrite();
  const isDataset = question.isDataset();
  const isPersisted = isDataset && question.isPersisted();
  const isCachingAvailable =
    !isDataset &&
    PLUGIN_CACHING.isEnabled() &&
    MetabaseSettings.get("enable-query-caching");
  const dispatch = useDispatch();

  const handleSave = (description: string | null) => {
    if (question.description() !== description) {
      onSave(question.setDescription(description).card());
    }
  };

  const handleUpdateCacheTTL = (cache_ttl: number | undefined) => {
    if (question.cacheTTL() !== cache_ttl) {
      return onSave(question.setCacheTTL(cache_ttl).card());
    }
  };

  return (
    <Root>
      <ContentSection>
        <HeaderContainer>
          <CustomRemoveButtonContainer
            onClick={() => dispatch(onCloseQuestionInfo())}
          >
            <Icon name="close" color="text-light" />
          </CustomRemoveButtonContainer>
        </HeaderContainer>
        <HeaderContainer>
          <h3>{t`About`}</h3>
          {question.isDataset() && (
            <HeaderLink
              to={Urls.modelDetail(question.card())}
            >{t`Model details`}</HeaderLink>
          )}
        </HeaderContainer>
        <EditableText
          initialValue={description}
          placeholder={
            !description && !canWrite ? t`No description` : t`Add description`
          }
          isOptional
          isMultiline
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

      {isCachingAvailable && (
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
