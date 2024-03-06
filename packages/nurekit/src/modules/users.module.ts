import { TypeAdapter } from "../adapters/type.adapter.js";
import { UserAdapter } from "../adapters/user.adapter.js";
import { IRawUser, IShortSchedule, IUser } from "../index.js";
import { axiosClient } from "../libs/axios.js";

interface IOptions {
  accessToken: string;
}

export class UsersModule {
  #userAdapter = new UserAdapter()
  #typeAdapter = new TypeAdapter()

  /**
	 * Method returns info about user:
	 * ```typescript
	 * {
	 *   id: string;
	 *   username: string;
   *   email: string;
   *   schedules: IShortSchedule[];
	 * }
	 * ```
	 *
	 * Example usage:
	 * ```typescript
   const options = { accessToken: 'token' }

	 const user = await nurekit.users.info(options)
	 * ```
	 *
	 * @see [Docs](https://github.com/OneLiL05/nurekit#get-groups)
	 *
	 * @publicApi
	 */
  async info({ accessToken }: IOptions): Promise<IUser> {
    const response = await axiosClient.get<IRawUser>("/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return this.#userAdapter.convert(response.data)
  }

  /**
	 * Example usage:
	 * ```typescript
   const options = { accessToken: 'token' }

	 const data = {
    id: 11103296,
    name: 'пзпі-23-5',
    type: 'groups',
   }

   await nurekit.users.addSchedule(data, options)
	 * ```
	 *
	 * @see [Docs](https://github.com/OneLiL05/nurekit#get-groups)
	 *
	 * @publicApi
	 */
  async addSchedule({ type, ...rest }: IShortSchedule, { accessToken }: IOptions): Promise<void> {
    await axiosClient.post('/user/add', { ...rest, type: this.#typeAdapter.toRaw(type) }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }

  /**
	 * Method removes schedule from your account:
	 *
	 * Example usage:
	 * ```typescript
   const options = { accessToken: 'token' }

	 const data = {
    id: 11103296,
    name: 'пзпі-23-5',
    type: 'groups',
   }

   await nurekit.users.removeSchedule(data, options)
	 * ```
	 *
	 * @see [Docs](https://github.com/OneLiL05/nurekit#get-groups)
	 *
	 * @publicApi
	 */
  async removeSchedule({ type, ...rest }: IShortSchedule, { accessToken }: IOptions) {
    await axiosClient.delete('/user/remove', {
      data: { ...rest, type: this.#typeAdapter.toRaw(type) },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}
