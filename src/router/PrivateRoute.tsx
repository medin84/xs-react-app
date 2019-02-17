import React, { StatelessComponent } from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps
} from "react-router-dom";

// type RouteComponent =
//   | React.ComponentClass<RouteComponentProps<any, any, any>, any>
//   | React.FunctionComponent<RouteComponentProps<any, any, any>>
//   | React.ComponentClass<any, any>
//   | React.FunctionComponent<any>;

interface PrivateRouteProps extends RouteProps {
  authenticated: boolean;
  redirectTo: string;
}

export const PrivateRoute: StatelessComponent<PrivateRouteProps> = ({
  authenticated,
  redirectTo,
  component,
  ...rest
}) => {
  const renderFn = (Component?: any) => (props: RouteProps) => {
    if (!Component) {
      return null;
    }

    if (authenticated) {
      return <Component {...props} />;
    }

    const redirectProps = {
      to: {
        pathname: redirectTo,
        state: { from: props.location }
      }
    };

    return <Redirect {...redirectProps} />;
  };

  return <Route {...rest} render={renderFn(component)} />;
};
