import slugg from "slugg";

import { serializeCardForUrl } from "metabase/lib/card";
import MetabaseSettings from "metabase/lib/settings";

import { Card as BaseCard } from "metabase-types/types/Card";
import Question, { QuestionCreatorOpts } from "metabase-lib/Question";

import { appendSlug, extractQueryParams } from "./utils";

type Card = Partial<BaseCard> & {
  id?: number | string;
  card_id?: string;
  name?: string;
  model?: "card" | "dataset";
  dataset?: boolean;
};

export const newQuestionFlow = () => "/question/new";

export type QuestionUrlBuilderParams = {
  hash?: Card | string;
  query?: Record<string, unknown> | string;
  objectId?: number | string;
};

export function question(
  card: Card | null,
  { hash = "", query = "", objectId }: QuestionUrlBuilderParams = {},
) {
  if (hash && typeof hash === "object") {
    hash = serializeCardForUrl(hash);
  }

  if (query && typeof query === "object") {
    query = extractQueryParams(query)
      .filter(([key, value]) => value !== undefined)
      .map(kv => kv.map(encodeURIComponent).join("="))
      .join("&");
  }

  if (hash && hash.charAt(0) !== "#") {
    hash = "#" + hash;
  }

  if (query && query.charAt(0) !== "?") {
    query = "?" + query;
  }

  const isModel = card?.dataset || card?.model === "dataset";
  let path = isModel ? "model" : "question";
  if (!card || !card.id) {
    return `/${path}${query}${hash}`;
  }

  const { card_id, id, name } = card;
  /**
   * If the question has been added to the dashboard we're reading the dashCard's properties.
   * In that case `card_id` is the actual question's id, while `id` corresponds with the dashCard itself.
   *
   * There can be multiple instances of the same question in a dashboard, hence this distinction.
   */
  const questionId = card_id || id;
  path = `/${path}/${questionId}`;

  /**
   * Although it's not possible to intentionally save a question without a name,
   * it is possible that the `name` is not recognized if it contains symbols.
   *
   * Please see: https://github.com/metabase/metabase/pull/15989#pullrequestreview-656646149
   */
  if (name) {
    path = appendSlug(path, slugg(name));
  }

  if (objectId) {
    path = `${path}/${objectId}`;
  }

  return `${path}${query}${hash}`;
}

export function serializedQuestion(card: Card, opts = {}) {
  return question(null, { ...opts, hash: card });
}

type NewQuestionUrlBuilderParams = QuestionCreatorOpts & {
  mode?: "view" | "notebook" | "query";
  creationType?: string;
  objectId?: number | string;
};

export function newQuestion({
  mode,
  creationType,
  objectId,
  ...options
}: NewQuestionUrlBuilderParams = {}) {
  const question = Question.create(options);
  const url = question.getUrl({
    creationType,
    query: objectId ? { objectId } : undefined,
  });

  const entity = question.isDataset() ? "model" : "question";

  if (mode) {
    return url.replace(/^\/(question|model)/, `/${entity}\/${mode}`);
  } else {
    return url;
  }
}

export function getCurrentQuerySearchParams() {
  const searchParams = new URLSearchParams(window.location.search);

  const paramsObject: any = {};

  searchParams.forEach((value, key) => {
    paramsObject[key] = value;
  });

  const querySearchParams = Object.keys(paramsObject)
    .map(key => `${key}=${paramsObject[key]}`)
    .join("&");

  return querySearchParams;
}

export function publicQuestion(
  uuid: string,
  type: string | null = null,
  query?: string,
) {
  const siteUrl = MetabaseSettings.get("site-url");
  const searchQuery = query ? `?${query}` : "";
  return (
    `${siteUrl}/public/question/${uuid}` +
    (type ? `.${type}` : "") +
    searchQuery
  );
}

export function createPublicDiscoverUrlForChart(
  uuid: string,
  type: string | null = null,
  query?: string,
) {
  const siteUrl = "https://dapplooker.com/chart";

  const endPath = window.location?.pathname.split("/").pop() || "";

  const match = endPath.match(/^(\d+)-(.+)$/);

  const formattedEndPath = match ? `${match[2]}-${match[1]}` : endPath;

  const searchParams = getCurrentQuerySearchParams();

  const searchQuery = searchParams
    ? query
      ? `?${searchParams}&${query}`
      : `?${searchParams}`
    : query
    ? `?${query}`
    : "";

  return (
    `${siteUrl}/${formattedEndPath}` + (type ? `.${type}` : "") + searchQuery
  );
}

export function chartApiEndPoint(uuid: string, type: string | null = null) {
  const siteUrl = "https://api.dapplooker.com/chart";

  const queryString = getCurrentQuerySearchParams();

  const finalQueryString = queryString
    ? `${queryString}&api_key=<API-KEY>&output_format=${type}`
    : `api_key=<API-KEY>&output_format=${type}`;

  return `${siteUrl}/${uuid}?${finalQueryString}`;
}

export function getImageApiEndPoint(uuid: string, type: string) {
  const siteUrl = `https://api.dapplooker.com/image`;

  const queryString = getCurrentQuerySearchParams();

  const finalQueryString = queryString
    ? `${queryString}&apiKey=<API-KEY>&type=${type}`
    : `apiKey=<API-KEY>&type=${type}`;

  return `${siteUrl}/${uuid}?${finalQueryString}`;
}

export function embedCard(token: string, type: string | null = null) {
  const siteUrl = MetabaseSettings.get("site-url");
  return `${siteUrl}/embed/question/${token}` + (type ? `.${type}` : ``);
}

export function tableRowsQuery(
  databaseId: number | string,
  tableId: number | string,
  metricId?: number | string,
  segmentId?: number | string,
) {
  let query = `?db=${databaseId}&table=${tableId}`;

  if (metricId) {
    query += `&metric=${metricId}`;
  }

  if (segmentId) {
    query += `&segment=${segmentId}`;
  }

  // This will result in a URL like "/question#?db=1&table=1"
  // The QB will parse the querystring and use DB and table IDs to create an ad-hoc question
  // We should refactor the initializeQB to avoid passing query string to hash as it's pretty confusing
  return question(null, { hash: query });
}
