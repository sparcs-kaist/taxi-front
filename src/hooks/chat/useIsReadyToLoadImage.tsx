import { useEffect, useState } from "react";

export default (src: string): [boolean, boolean] => {
  const [srcAfterLoad, setSrcAfterLoad] = useState<Nullable<string>>();
  const [isFail, setIsFail] = useState<boolean>(false);

  useEffect(() => {
    const imageObj = new Image();
    imageObj.onerror = () => {
      console.log(123);
      setIsFail(true);
      setSrcAfterLoad(src);
    };
    imageObj.onload = () => {
      setIsFail(false);
      setSrcAfterLoad(src);
    };
    imageObj.loading = "eager";
    imageObj.src = src;
  }, [src]);

  return srcAfterLoad === src ? [!isFail, isFail] : [false, false];
};
