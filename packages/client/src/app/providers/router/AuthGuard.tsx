import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "@/app/constants/paths";
import { useLazyGetUserInfoQuery } from "@/api/authApi";
import { useActions } from "@/hooks";

export const AuthGuard: React.FC<PropsWithChildren> = props => {
  const navigate = useNavigate();
  const [getUserInfo, { isSuccess, isLoading }] = useLazyGetUserInfoQuery();

  const { setProfile } = useActions();

  useEffect(() => {
    getUserInfo()
      .unwrap()
      .then(setProfile)
      .catch(error => {
        if (error.status === 401) {
          navigate(paths.signIn);

          return;
        }

        navigate(paths.error);
      });
  }, []);

  return (
    <>
      {isSuccess && <>{props.children}</>}
      {isLoading && <span>Loading...</span>}
    </>
  );
};
