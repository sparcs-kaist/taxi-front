import Button from "components/Button";
import { backServer } from "loadenv";
import { ButtonProps } from "components/Button";

type LoginButtonProps = ButtonProps & { isLogin?: boolean; redirect: string };

const LoginButton = (props: LoginButtonProps) => {
  const { isLogin, redirect, ...buttonProps } = props;

  console.log(redirect);

  return isLogin ? (
    <Button {...buttonProps}>{props.children}</Button>
  ) : (
    <a
      href={`${backServer}/auth/sparcssso?redirect=${encodeURIComponent(
        redirect
      )}`}
      style={{ textDecoration: "none" }}
    >
      <Button {...buttonProps}>{props.children}</Button>
    </a>
  );
};

export default LoginButton;
