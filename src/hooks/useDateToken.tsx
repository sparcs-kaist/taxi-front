import { useCallback, useState } from "react";

const useDateToken = () => {
  const [token, setToken] = useState(Date.now().toString());
  const refreshToken = useCallback(
    () => setToken(Date.now().toString()),
    [setToken]
  );
  return [token, refreshToken];
};

export default useDateToken;
