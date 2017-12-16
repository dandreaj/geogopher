export const countdownGameLogic = (map, gameData, answerSanitized) => {
  console.log('answerInput');
  console.log(answerInput);
  //loop through gamedata array
  for (var i = 0; i < gameData.length; i++) {
    //loop through accepted answers within country obj
    for (var j = 0; j < gameData[i].acceptedAnswers.length; j++) {
      // if answer matches
      if (answerInput === gameData[i].acceptedAnswers[j]) {
        // if the answer has already been input
        if (gameData[i].polygonAnswered) {
          return ['answered', gameData[i].id];
        } else {
          return ['unanswered', gameData[i].id];
        }
      }
    }
  }
  return ['incorrect', answerInput];
}
