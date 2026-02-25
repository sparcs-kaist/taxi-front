import { useEffect, useRef, useState } from "react";

import theme from "@/tools/theme";

const slideUpKeyframes = `
  @keyframes slideUpContent {
    0% { opacity: 0; transform: translateY(10px) scale(0.98); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
`;

export type TileVariant = "purple" | "orange" | "yellow" | "white";

export interface DynamicStatTileProps {
  data: Array<{
    label: string;
    value: number;
    prefix?: string;
    unit?: string;
    variant: TileVariant;
  }>;
  className?: string;
  css?: any;
}

const useCountUp = (end: number, duration: number = 1000, trigger: number) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    setCount(0);
    countRef.current = 0;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);

      // easeOutQuint: 끝부분에서 더 급격하게 느려짐
      const ease = 1 - Math.pow(1 - percentage, 5);
      const currentCount = ease * end;

      if (countRef.current !== currentCount) {
        setCount(currentCount);
        countRef.current = currentCount;
      }

      if (percentage < 1) {
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current);
    };
  }, [end, duration, trigger]);

  return count;
};

const DynamicStatTile = ({ data, className, css }: DynamicStatTileProps) => {
  const [index, setIndex] = useState(0);
  const currentItem = data[index];

  // 1초 동안 애니메이션 실행
  const displayValue = useCountUp(currentItem.value, 1000, index);

  const getDecimalPlaces = (num: number) => {
    if (Math.floor(num) === num) return 0;
    return num.toString().split(".")[1]?.length || 0;
  };
  const decimalPlaces = getDecimalPlaces(currentItem.value);

  const handleClick = () => {
    setIndex((prev) => (prev + 1) % data.length);
  };

  const getBackground = (variant: TileVariant) => {
    switch (variant) {
      case "purple":
        return "linear-gradient(315deg, #7432caff 0%, #9070cdff 100%)";
      case "orange":
        return "linear-gradient(135deg, #F6AD55 0%, #DD6B20 100%)";
      case "yellow":
        return "linear-gradient(135deg, #f6e655ff 0%, #efbf30ff 100%)";
      default:
        return theme.white;
    }
  };

  const getTextColor = (variant: TileVariant) => {
    switch (variant) {
      case "yellow":
        return "#2d1d0dff";
      case "white":
        return theme.black;
      default:
        return "#FFFFFF";
    }
  };

  return (
    <>
      <style>{slideUpKeyframes}</style>
      <div
        onClick={handleClick}
        className={className}
        css={{
          ...css,
          background: getBackground(currentItem.variant),
          padding: "24px 24px 20px 24px",
          borderRadius: "24px",
          display: "flex",
          flexDirection: "column",
          minHeight: "120px",
          cursor: "pointer",
          transition: "background 0.3s ease, box-shadow 0.3s ease",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          position: "relative",
          userSelect: "none",
          "&:active": {
            transform: "scale(0.98)",
            transition: "transform 0.1s",
          },
        }}
      >
        <div
          key={index}
          css={{
            animation:
              "slideUpContent 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}
        >
          <div
            css={{
              fontSize: "21px",
              fontWeight: 800,
              color: getTextColor(currentItem.variant),
              marginBottom: "12px",
              whiteSpace: "pre-wrap",
              lineHeight: "1.3",
              opacity: 1,
              textShadow:
                currentItem.variant === "yellow"
                  ? "none"
                  : "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            {currentItem.label}
          </div>
          <div
            css={{
              fontSize: "32px",
              fontWeight: 800,
              color: getTextColor(currentItem.variant),
              textAlign: "right",
              fontFamily: "SUIT, sans-serif",
              marginTop: "32px",
              display: "flex",
              alignItems: "baseline",
              justifyContent: "flex-end",
              textShadow:
                currentItem.variant === "yellow"
                  ? "none"
                  : "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            {currentItem.prefix}
            {displayValue.toLocaleString(undefined, {
              minimumFractionDigits: decimalPlaces,
              maximumFractionDigits: decimalPlaces,
            })}
            {currentItem.unit && (
              <span
                css={{
                  fontSize: "20px",
                  marginLeft: "4px",
                  fontWeight: 700,
                }}
              >
                {currentItem.unit}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DynamicStatTile;
