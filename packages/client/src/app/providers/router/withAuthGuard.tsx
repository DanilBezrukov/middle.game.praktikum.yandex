import React from "react";
import { paths } from "@/app/constants/paths";
import { useLazyGetUserInfoQuery } from "@/api/authApi";
import { useActions } from "@/hooks";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const withAuthGuard = <Props extends object = object>(
  BaseComponent: React.ComponentType<Props>,
): React.ComponentType<Props> => {
  const WrappedComponent = (props: Props) => {
    const [getUserInfo, { isSuccess, isFetching }] = useLazyGetUserInfoQuery();
    const { setProfile } = useActions();
    const [errorStatus, setErrorStatus] = useState<number | null>(null);

    useEffect(() => {
      getUserInfo()
        .unwrap()
        .then(setProfile)
        .catch(error => {
          setErrorStatus(error.status);
        });
    }, []);

    if (errorStatus && errorStatus !== 401) {
      return <Navigate to={paths.error} />;
    }

    if (errorStatus && errorStatus === 401) {
      return <Navigate to={paths.signIn} />;
    }

    return <BaseComponent {...props} />;
  };

  // Добавление displayName для отладки
  WrappedComponent.displayName = `withAuthGuard(${
    BaseComponent.displayName || BaseComponent.name || "Component"
  })`;

  return WrappedComponent;
};
