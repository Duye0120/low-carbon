import request from "@/api/request";

export function getDailyTask(data: { pointId: string; wxId: string }) {
  return request<any>({
    url: "/low/carbon/task/getDailyTask",
    method: "POST",
    data,
  });
}

export function finishClockTask(data: {
  pointId: string;
  wxId: string;
  clockType: string;
}) {
  return request<any>({
    url: "/low/carbon/task/finishClockTask",
    method: "POST",
    data,
  });
}

export function getQuesDetail(data: { id: string }) {
  return request<any>({
    url: "/low/carbon/question/getById",
    method: "GET",
    data,
  });
}

export function finishQuestionTask(data: {
  pointId: string;
  wxId: string;
  questionId: string;
  isRight: number;
  rewardScore: number;
  selectedAnswer: string;
}) {
  return request<any>({
    url: "/low/carbon/task/finishQuestionTask",
    method: "POST",
    data,
  });
}

export function getArticleDetail(data: { id: string }) {
  return request<any>({
    url: "/low/carbon/article/scan/getById",
    method: "GET",
    data,
  });
}

export function getScoreNumTop10() {
  return request<any>({
    url: "/low/carbon/score/record/getScoreNumTop10",
    method: "POST",
  });
}
