export type VisitCreateInput = {
  id: string;
  visitorId: string;
  websiteId: string;
  path: string;
  device: string;
  os: string;
  browser: string;
  createdAt: Date | string;
};
