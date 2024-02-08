import { useCallback, useState } from "react";

const randomString = () => Math.random().toString(36).substring(2, 15);

const useDateToken = (): [string, () => void] => {
  const [token, setToken] = useState(Date.now().toString() + randomString());
  const refreshToken = useCallback(
    () => setToken(Date.now().toString() + randomString()),
    [setToken]
  );
  return [token, refreshToken];
};

export default useDateToken;
