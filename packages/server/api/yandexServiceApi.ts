import axios from "axios";

export const yandexServiceApi = async ({ cookie }: { cookie: string }) => {
  let url;

  if (process.env.YA_PROXY_HOST && process.env.YA_API_POINT) {
    url = process.env.YA_PROXY_HOST + process.env.YA_API_POINT + "/auth/user";
  } else return;

  try {
    const { data: user } = await axios({
      method: "GET",
      url,
      headers: {
        cookie,
      },
    });

    return user;
  } catch (e) {
    return null;
  }
};
