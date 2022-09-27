import _isMobile from "ismobilejs";

const isMobile = _isMobile().phone || _isMobile().tablet;

export default isMobile;
