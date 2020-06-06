//GLOBAL variables
const candidateListTable = document.querySelector('#candidate-list');
const candidateList = [];
let globalCandidateGrouping = [[]];

//Create the UI class
const ui = new UI();

// CLASS create candidate object
class Candidate {
  constructor(firstName, q1answer, q2answer, q3answer) {
    this.candidateNo = candidateList.length;
    this.firstName = firstName;
    this.q1answer = q1answer;
    this.q2answer = q2answer;
    this.q3answer = q3answer
  }
}

//EVENT: generate random data button
document.querySelector('#random-data').addEventListener('submit', generateRandomData);
function generateRandomData(e) {

  for (let i = 0; i < 8; i++) {
    let random1 = Math.ceil((Math.random() * 10));
    let random2 = Math.ceil((Math.random() * 10));
    let random3 = Math.ceil((Math.random() * 10));

    //add candidates to list
    const newCandidate = new Candidate(generateName(), random1, random2, random3);
    candidateList.push(newCandidate);
    ui.addNewCandidate(newCandidate);
  }

  e.preventDefault();
}

//EVENT: submit new candidate
document.querySelector('#candidate-form').addEventListener('submit', newCandidateAdded);
function newCandidateAdded(e) {

  //Get values from the form
  const firstName = document.querySelector('#first-name').value;
  const q1answer = parseInt(document.querySelector('#question1').value);
  const q2answer = parseInt(document.querySelector('#question2').value);
  const q3answer = parseInt(document.querySelector('#question3').value);

  //create error message if not all fields are filled in
  if (firstName === "" || isNaN(q1answer) || isNaN(q2answer) || isNaN(q3answer)) {
    ui.message('Please fill in all fields', 'error message');
  } else if (q1answer < 0 || q1answer > 10 || q2answer < 0 || q2answer > 10 || q3answer < 0 || q3answer > 10) {
    ui.message('Answers must be between 1-10', 'error message');
  } else {

    //create new Candidate object
    const newCandidate = new Candidate(firstName, q1answer, q2answer, q3answer)
    //add candidate to list
    candidateList.push(newCandidate);
    //Add the new candidate ot the UI
    ui.addNewCandidate(newCandidate);
    //UI message
    ui.message('Participant Added!', 'success message');

    //clear the inputs
    ui.clearInputs();
  }

  //prevent default behaviour
  e.preventDefault();
}

//EVENT delete a candidate
candidateListTable.addEventListener('click', function (e) {

  //get candidate number
  const candidateNo = ui.getCandidateNo(e.target);
  //remove candidate from list
  candidateList.splice(candidateNo, 1);
  //reassign candidate numbers
  for (let i = 0; i < candidateList.length; i++) {
    candidateList[i].candidateNo = i;
  }

  //clear UI
  ui.clearUI();
  //rebuild UI
  ui.buildUI();
  // UI message
  ui.message('Participant deleted', 'success message');

  e.preventDefault();
})

//EVENT: calculate button
document.querySelector('#calculate-groups').addEventListener('submit', calculateResults);
function calculateResults(e) {

  //Error if there are not enough participants
  if (candidateList.length < 8) {

    //message in the UI
    ui.message('Not Enough Participants (8 Minimum)', 'error message', true);


    //don't continue code;
    e.preventDefault()
    return
  }

  // get groupings
  const groupings = getGroupings(candidateList.length)

  //clear global groupings
  globalCandidateGrouping = [[]];

  //group randomly
  let position = 0;
  let myGroup = []
  //create global groupings (randomly)
  for (let j = 0; j < groupings.length; j++) {
    for (let i = 0; i < groupings[j]; i++) {
      myGroup[i] = candidateList[position];
      position++
    }
    globalCandidateGrouping[j] = myGroup;
    myGroup = [];
  }

  //get the grouping score
  let stillSwapping = true;

  //keep swapping until you've tried all possibilities
  while (stillSwapping) {
    stillSwapping = myFormulaSwap();
  }

  //display the results in UI
  ui.displayResults();

  // Scroll to the results into view
  document.getElementById("results-table").scrollIntoView({ behavior: 'smooth' });

  e.preventDefault();
}

// FUNCTION: swap around all the candidate in the groups until the score is optimal
function myFormulaSwap() {
  let groupingScoreBefore = totalGroupingScore();
  let groupingScoreAfter;

  let group1;
  let group2;

  //loop through all group combinations
  for (let j = 0; j < (globalCandidateGrouping.length - 1); j++) {
    for (let i = j; i < (globalCandidateGrouping.length - 1); i++) {
      //compare all candidates bewteen two groups
      group1 = globalCandidateGrouping[j];
      group2 = globalCandidateGrouping[i + 1];


      for (let l = 0; l < group1.length; l++) { //for every person in group 1
        for (let k = 0; k < group2.length; k++) { // for every person in group 2

          // Swap two people
          let temp = group1[l];
          group1[l] = group2[k];
          group2[k] = temp;

          // get new score
          groupingScoreAfter = totalGroupingScore();

          //if this grouping score is better, return true,
          if (groupingScoreAfter < groupingScoreBefore) {
            return true;
          } else {
            //Swap Back
            let temp = group1[l];
            group1[l] = group2[k];
            group2[k] = temp;
          }
        }
      }
    }
  }
  //return false only when you've tried every possible combination;
  return false;
}

//Function: compatibility test
function checkCompatibility(candidate1, candidate2) {
  let score1 = Math.abs(candidate1.q1answer - candidate2.q1answer);
  let score2 = Math.abs(candidate1.q2answer - candidate2.q2answer);
  let score3 = Math.abs(candidate1.q3answer - candidate2.q3answer);
  let totalScore = score1 + score2 + score3;
  return totalScore;
}

// Function: group score
function groupScore(group) {

  //calculate the score for the group
  let result = 0;
  let iteration = 0 // number of times compatibility has been checked
  for (let j = 0; j < (group.length - 1); j++) {
    for (let i = j; i < (group.length - 1); i++) {
      //check compatibility of each person and add that to the result
      score = checkCompatibility(group[j], group[i + 1]);
      result += score;
      iteration++
    }
  }
  result /= iteration;
  return result;
}


// Function: total group set score
function totalGroupingScore() {

  let totalScore = 0

  //perform groupscore function on every group
  globalCandidateGrouping.forEach((group) => {
    totalScore += groupScore(group);
  })
  return totalScore;
}
