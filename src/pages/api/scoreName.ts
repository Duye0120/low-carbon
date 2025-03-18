export const scoreName = (score: number) => {
    console.log(score);
  if (score <= 5) {
    return "减碳新锐";
  } else if (score <= 10) {
    return "减碳先锋";
  } else if (score <= 15) {
    return "减碳大师";
  } else {
    return "零碳达人";
  }
};