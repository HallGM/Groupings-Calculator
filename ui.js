//CLASS UI constructor
class UI {

  //FUNCTION: function that adds new candidate to UI
  addNewCandidate(candidate) {
    //create the row
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${candidate.firstName}</td>
      <td>${candidate.q1answer}</td>
      <td>${candidate.q2answer}</td>
      <td>${candidate.q3answer}</td>
      <td><a href="#" id="delete-button">x</a></td>`;
    //add the row to table

    row.candidateNo = candidate.candidateNo;
    candidateListTable.insertBefore(row, candidateListTable.firstChild);
  }

  // FUNCTION:create function to clear the inputs
  clearInputs() {
    //Get values from the form
    document.querySelector('#first-name').value = "";
    document.querySelector('#question1').value = "";
    document.querySelector('#question2').value = "";
    document.querySelector('#question3').value = "";
  }

  // FUNCTION: message function
  message(message, className, scroll) {

    //get any current message if there is one
    const currentMessage = document.querySelector('.message');

    //if there is already a message there, remove it
    if (currentMessage) {
      currentMessage.remove();
    }

    //create the message
    const messageDiv = document.createElement('div');

    messageDiv.className = className;
    messageDiv.innerHTML = message;

    //get parent element
    const parent = document.querySelector('#main-container');
    //get form element
    const form = document.querySelector('#candidate-form');

    //insert the element
    parent.insertBefore(messageDiv, form);

    //scroll up to the element
    if (scroll) {
      messageDiv.scrollIntoView({ behavior: 'smooth' });
    }
    //disappear after 3 seconds
    window.setTimeout(function () {
      messageDiv.remove();
    }
      , 3000);
  }

  //FUNCTION: clear UI
  clearUI() {
    candidateListTable.innerHTML = "";
  }

  //FUNCTION: Build UI
  buildUI() {
    for (let i = 0; i < candidateList.length; i++) {
      ui.addNewCandidate(candidateList[i]);
    }
  }

  //FUNCTION: get the candidate number
  getCandidateNo(element) {
    return element.parentElement.parentElement.candidateNo;
  }

  //FUNCTION: display results after calculating
  displayResults() {
    //get results table
    const table = document.querySelector('#results-table');
    table.innerHTML = '';
    let person;
    let myHtml;
    let div;
    for (let i = 0; i < globalCandidateGrouping.length; i++) {
      myHtml = `
          <h3>Group ${i + 1}</h3>
          <ul>
          `;
      for (let j = 0; j < globalCandidateGrouping[i].length; j++) {
        person = globalCandidateGrouping[i][j];
        myHtml += `
            <li>${person.firstName}: (scored ${person.q1answer}, ${person.q2answer}, ${person.q3answer})</li>
            `;
      }
      myHtml += '</ul>';

      div = document.createElement('div');
      div.innerHTML = myHtml;
      div.className = 'group';
      table.appendChild(div);
    }
  }
}