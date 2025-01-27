import React from "react";
import { paths } from "@/app/constants/paths";
import { useLazyGetUserInfoQuery } from "@/api/authApi";
import { useActions } from "@/hooks";
import { UiLayout } from "@/components/ui/UiLayout";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const withAuthGuard = <Props extends object = object>(
  BaseComponent: React.ComponentType<Props>,
): React.ComponentType<Props> => {
  const WrappedComponent = (props: Props) => {
    const [getUserInfo, { isLoading }] = useLazyGetUserInfoQuery();
    const { setProfile } = useActions();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorStatus, setErrorStatus] = useState<number | null>(null);

    useEffect(() => {
      getUserInfo()
        .unwrap()
        .then(data => {
          setProfile(data);
          setIsLoggedIn(true);
        })
        .catch(error => {
          setErrorStatus(error.status);
        });
    }, []);

    if (isLoading) return <div>Loading...</div>;

    if (isLoggedIn) {
      return (
        <UiLayout>
          <BaseComponent {...props} />
        </UiLayout>
      );
    }

    if (errorStatus && errorStatus !== 401) {
      return <Navigate to={paths.error} />;
    }

    if (errorStatus && errorStatus === 401) {
      return <Navigate to={paths.signIn} />;
    }

    return null;
  };

  // Добавление displayName для отладки
  WrappedComponent.displayName = `withAuthGuard(${
    BaseComponent.displayName || BaseComponent.name || "Component"
  })`;

  return WrappedComponent;
};
