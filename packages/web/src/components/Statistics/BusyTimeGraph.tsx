import theme from "@/tools/theme";

interface GraphData {
  label: string; // 시간대 등
  value: number; // 높이 (0~100)
  isHighlight?: boolean; // 강조 표시 여부
}

interface BusyTimeGraphProps {
  data: GraphData[];
  title: string;
}

const BusyTimeGraph = ({ data, title }: BusyTimeGraphProps) => {
  return (
    <div
      css={{
        background: "#F7F7F7", // 연한 회색 배경 (이미지와 비슷하게)
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "inset 0 2px 10px rgba(0,0,0,0.03)", // 안쪽 그림자로 깊이감 주기
        display: "flex",
        flexDirection: "column",
        minHeight: "150px",
      }}
    >
      <div
        css={{
          fontSize: "14px",
          color: theme.purple,
          fontWeight: "bold",
          marginBottom: "16px",
        }}
      >
        {title}
      </div>

      {/* 그래프 영역 */}
      <div
        css={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flex: 1,
          gap: "6px", // 막대 사이 간격
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            css={{
              width: "100%",
              height: `${item.value}%`, // 값에 따른 높이 설정
              backgroundColor: item.isHighlight ? theme.purple : "#CBD5E0", // 강조색 vs 일반색
              borderRadius: "4px",
              transition: "height 0.5s ease-in-out",
              position: "relative",
              "&:hover": {
                opacity: 0.8,
              },
            }}
            title={item.label} 
          />
        ))}
      </div>
    </div>
  );
};

export default BusyTimeGraph;
