import { Create } from "../common/interfaces";
import { CreateUserDto, UserDto } from "../common/types";

export interface UsersServiceInterface extends Create<CreateUserDto, UserDto> {}
