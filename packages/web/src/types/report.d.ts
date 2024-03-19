export type ReportResponse = { status: number };
export type Report = {
  reportedId: string;
  type: "no-settlement" | "no-show" | "etc-reason";
  etcDetail: string;
  time: Date;
};
