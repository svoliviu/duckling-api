import { CreateWebsiteDto, WebsiteDto } from "../common";
import { Create, Find } from "../common/interfaces";

export interface WebsitesServiceInterface
  extends Create<CreateWebsiteDto, WebsiteDto>,
    Find<string | string[], WebsiteDto> {}
