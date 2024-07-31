import slugg from "slugg";

import { stringifyHashOptions } from "metabase/lib/browser";
import MetabaseSettings from "metabase/lib/settings";

import { Dashboard } from "metabase-types/api";

import { appendSlug } from "./utils";

type DashboardUrlBuilderOpts = {
  addCardWithId?: number;
  editMode?: boolean;
};

export function dashboard(
  dashboard: Dashboard,
  { addCardWithId, editMode }: DashboardUrlBuilderOpts = {},
) {
  const options = {
    ...(addCardWithId ? { add: addCardWithId } : {}),
    ...(editMode ? { edit: editMode } : {}),
  };

  const path = appendSlug(dashboard.id, slugg(dashboard.name));
  const hash = stringifyHashOptions(options);
  return hash ? `/dashboard/${path}#${hash}` : `/dashboard/${path}`;
}

export function publicDashboard(uuid: string) {
  const siteUrl = MetabaseSettings.get("site-url");
  return `${siteUrl}/public/dashboard/${uuid}`;
}

export function getQuerySearchParams() {
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

export function createPublicDiscoverUrlForDashboard(uuid: string) {
  const siteUrl = "https://dapplooker.com/dashboard";

  const endPath = window.location?.pathname.split("/").pop() || "";

  const match = endPath.match(/^(\d+)-(.+)$/);

  const formattedEndPath = match ? `${match[2]}-${match[1]}` : endPath;

  const searchParams = getQuerySearchParams();

  const searchQuery = searchParams ? `?${searchParams}` : "";

  return `${siteUrl}/${formattedEndPath}` + searchQuery;
}

export function getPublicEmbedUrlForDashboard(uuid: string) {
  const url = "https://analytics.dapplooker.com/public/dasboard";

  const searchParams = getQuerySearchParams();

  return `${url}/${uuid}${searchParams && `?${searchParams}`}`;
}

export function embedDashboard(token: string) {
  const siteUrl = MetabaseSettings.get("site-url");
  return `${siteUrl}/embed/dashboard/${token}`;
}
