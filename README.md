# Groupings-Calculator

This project was created in collaboration with the Extinction Rebellion Glasgow. Workshop participants are placed into groups based on answers provided to a survey. The Groupings Calculator takes in a list of 8 or more participants who have answered three questions with numerical answers from 1 to 10. It then places them into groups where people with the most similar answers are grouped together.

[Click here to go to app](https://hallgm.github.io/Groupings-Calculator/)

# How the Algorithm Works:

Participants are put into groups - randomly at first. They are put into groups of 5, where any remainders are added to the first few groups to make groups of 6. In some cases, groups of 4 are used if the numbers are awkward. These exceptions are when there are  8, 9, 13, 14 or 19 participants. Less than 8 does not work.

In order to test the compatiility of two participants, we take the difference between their answers to the three questions, and add the three numbers together to give them a compatibility score. The lower the score, the better the compatibility. We can then calculate a complete group compatibilty score by comparing every participant with every other participant in their group. In order to compensate for the different group sizes, an average of each of these comparisons is taken. The same is done for each of the groups and all scores are added together to get an overall group set score.

Once this base score has been established, we use it to compare with other possible permutations. As a test, the first partiipant in group one is swapped with the first participant in group two. If this swap leads to a better overall group set score, then the swap is kept. If the swap leads to a worse score, then we swap back and we move on to testing the first participant in group one against the second partipant in group two. Any time a swap is made, the entire process must be reset. This pattern continues until every participant has been tested against every other participant (apart from those in their own group), no further swaps can be made and we have found the best possible permutation.
