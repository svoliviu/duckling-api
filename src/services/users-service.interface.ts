import { Create, Find } from "../common/interfaces";
import { CreateUserDto, UserDto } from "../common/types";

export interface UsersServiceInterface
  extends Create<CreateUserDto, UserDto>,
    Find<string | string[], UserDto> {}
