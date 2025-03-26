import { devRedirectUri, useIsLoginYandexMutation } from "@/api/authApi";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { paths } from "@/app/constants/paths";

export const SocialAuthPage = () => {
  const [checkIsUserLoggedIn] = useIsLoginYandexMutation();
  const navigate = useNavigate();
  const [isRenderPage, setRenderPage] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code && !isRenderPage) {
      checkIsUserLoggedIn({
        code,
        // eslint-disable-next-line camelcase
        redirect_uri: devRedirectUri,
      }).then(() => {
        setRenderPage(true);
        navigate(paths.homePage);
      });
    }
  }, []);

  return null;
};
