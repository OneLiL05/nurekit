import { IAuthData, ITokens } from "../index.js";
import { axiosClient } from "../libs/axios.js";

export class AuthModule {
  /**
	 * Method registers user
	 *
	 * Example usage:
	 * ```typescript
   const credentials = {
    email: 'test@smth.com'
    password: '123456'
   }


	 await nurekit.auth.signup(credentials)
	 * ```
	 *
	 * @see [Docs](https://github.com/OneLiL05/nurekit#get-groups)
	 *
	 * @publicApi
	 */
  async signup(data: IAuthData): Promise<void> {
    await axiosClient.post("/register", data)
  }

  /**
	 * Method logins user and return tokens:
	 * ```typescript
	 * {
	 *   accessToken: number;
	 *   refreshToken: string;
	 * }
	 * ```
	 *
	 * Example usage:
	 * ```typescript
   const credentials = {
    email: 'test@smth.com'
    password: '123456'
   }

   const tokens = await nurekit.auth.login(credentials)
	 * ```
	 *
	 * @see [Docs](https://github.com/OneLiL05/nurekit#get-groups)
	 *
	 * @publicApi
	 */
  async login(data: IAuthData): Promise<ITokens> {
    return (await axiosClient.post<ITokens>('/login', data)).data
  }
}
