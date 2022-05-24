export type Session = {
  id: string;
  visitorId: string;
  websiteId: string;
  visits: number;
  browser: string;
  os: string;
  device: string;
  createdAt: Date;
  updatedAt: Date | null;
};
