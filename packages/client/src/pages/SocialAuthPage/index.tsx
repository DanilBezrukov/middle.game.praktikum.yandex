import { devRedirectUri, useIsLoginYandexMutation, useLazyGetUserInfoQuery } from "@/api/authApi";
import { useActions } from "@/hooks";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { HomePage } from "../HomePage";

export const SocialAuthPage = () => {
  const [getUserInfo] = useLazyGetUserInfoQuery();
  const [checkIsUserLoggedIn, { isLoading, isUninitialized }] = useIsLoginYandexMutation();
  const { setProfile } = useActions();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      checkIsUserLoggedIn({
        code,
        // eslint-disable-next-line camelcase
        redirect_uri: devRedirectUri,
      }).then(() => {
        setIsLoggedIn(true);
        getUserInfo()
          .unwrap()
          .then(data => {
            setProfile(data);
          });
      });
    }
  }, []);

  return (
    <>
      {isLoading || (isUninitialized && <div>Loading...</div>)}
      {isLoggedIn && <HomePage />}
    </>
  );
};
