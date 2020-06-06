//Function return an array indicating how groupings should be made
function getGroupings(noOfCandidates) {
  // return null if there are less than 8 candidates
  if (noOfCandidates < 8) {
    const error = null;
    return error;
  }

  // default for awkward numbers
  switch (noOfCandidates) {
    case 8: return [4, 4]; break;
    case 9: return [4, 5]; break;
    case 13: return [5, 4, 4]; break;
    case 14: return [5, 5, 4]; break;
    case 19: return [5, 5, 5, 4]; break;
  }

  // calculate groupings
  let noOfGroups = Math.floor(noOfCandidates / 5);
  let remainder = noOfCandidates % 5;
  let result = []
  // create array of 5s 
  for (let i = 1; i <= noOfGroups; i++) {
    result.push(5);
  }
  // add the 6s at start
  for (let i = 0; i < remainder; i++) {
    result[i]++;
  }

  return result;
}