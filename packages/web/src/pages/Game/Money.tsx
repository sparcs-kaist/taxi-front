// import AdaptiveDiv from "@/components/AdaptiveDiv";
// import { useValueRecoilState } from "@/hooks/useFetchRecoilState";
// import { Quest } from "@/types/game";
// import { useMemo } from "react";
// import theme from "@/tools/theme";
// import WhiteContainer from "@/components/WhiteContainer";
// import { ReactComponent as CreditIcon } from "@/static/events/2025springCredit.svg";
// import { ReactComponent as MissionCompleteIcon } from "@/static/events/2025springMissionComplete.svg";
// import Footer from "@/components/Footer";

// type MissionContainerProps = {
//   quest: Quest;
// };

// const MissionContainer = ({ quest }: MissionContainerProps) => {
//   const { completedQuests } = useValueRecoilState("gameInfo") || {};
//   const [isDone, questCompletedCnt] = useMemo(() => {
//     const cnt =
//       completedQuests?.filter(({ questId }) => questId === quest.id).length ??
//       0;
//     const isDone = quest.maxCount ? cnt >= quest.maxCount : false;
//     return [isDone, cnt];
//   }, [quest, completedQuests]);

//   const styleBody = {
//     display: "flex",
//   };
//   const styleImageWrap = {
//     flexGrow: 0,
//     width: "25%",
//     overflow: "hidden",
//     marginRight: "12px",
//     position: "relative" as const,
//   };
//   const styleImageBorder = {
//     position: "relative" as const,
//     aspectRatio: "1 / 1",
//     border: `1px solid ${theme.gray_line}`,
//     borderRadius: "10px",
//     overflow: "hidden",
//     backgroundColor: theme.white,
//   };
//   const styleImage = {
//     width: "100%",
//     height: "100%",
//   };
//   const styleBlur = {
//     background: theme.black_40,
//     position: "absolute" as const,
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//   };
//   const styleContentBox = {
//     width: 0,
//     flexGrow: 1,
//   };
//   const styleTitle = {
//     ...theme.font16_bold,
//     color: isDone ? theme.gray_text : theme.black,
//     marginBottom: "4px",
//   };
//   const styleDescription = {
//     ...theme.font12,
//     color: isDone ? theme.gray_text : theme.black,
//   };
//   const styleReward = {
//     display: "flex",
//     marginTop: "12px",
//     gap: "4px",
//   };
//   const styleRewardText = {
//     ...theme.font12_bold,
//     color: isDone ? theme.gray_text : theme.black,
//   };
//   const styleStamp = {
//     position: "absolute" as const,
//     right: "-10px",
//     bottom: "-10px",
//     width: "100px",
//     height: "100px",
//     opacity: 0.5,
//   };

//   return (
//     <WhiteContainer
//       css={{
//         padding: "12px 12px 12px 20px",
//         backgroundColor: isDone ? theme.gray_background : theme.white,
//       }}
//     >
//       <div
//         css={{
//           position: "absolute",
//           top: 0,
//           bottom: 0,
//           left: 0,
//           width: "8px",
//           background: isDone ? theme.purple_disabled : theme.purple,
//         }}
//       />
//       <div css={styleBody}>
//         <div css={styleImageWrap}>
//           <div css={styleImageBorder}>
//             <img src={quest.imageUrl} alt={quest.name} css={styleImage} />
//             {isDone && <div css={styleBlur} />}
//           </div>
//         </div>
//         <div css={styleContentBox}>
//           <div css={styleTitle}>{quest.name}</div>
//           <div
//             css={styleDescription}
//             dangerouslySetInnerHTML={{ __html: quest.description }}
//           />
//         </div>
//       </div>
//       <div css={styleReward}>
//         <div css={styleRewardText}>
//           달성 {questCompletedCnt}번 /{" "}
//           {quest.maxCount > 0 ? `최대 ${quest.maxCount}번` : "무제한"}
//         </div>
//         <div css={{ flexGrow: 1 }} />
//         {!isDone && (
//           <>
//             <div css={styleRewardText}>달성 시에</div>
//             <CreditIcon
//               css={{ width: "27px", height: "16px", marginTop: "-2px" }}
//             />
//             <div css={styleRewardText}>X {quest.reward.credit} 획득</div>
//           </>
//         )}
//       </div>
//       {isDone && <MissionCompleteIcon css={styleStamp} />}
//     </WhiteContainer>
//   );
// };

// const Money = () => {
//   const { quests } = useValueRecoilState("gameInfo") || {};

//   return <>
//   <AdaptiveDiv type="center">
//         <div css={{ height: "30px" }} />
//         {quests?.map((quest) => (
//           <MissionContainer key={quest.id} quest={quest} />
//         ))}
//         <Footer type="game" />
//       </AdaptiveDiv>
//   </>;
// };

// export default Money;

const Money = () => {
  return <></>;
};

export default Money;
