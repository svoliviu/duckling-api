export type CreateVisitDto = {
  website: {
    url: string;
  };
  visitor: {
    id: string;
    display: string;
    userAgent: string;
    referer?: string;
  };
};
