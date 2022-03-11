import * as types from "./types";

/*
#####################################################################
                    QUESTIONS SECTION
#####################################################################

  This is where we define the questions that are asked in a given a survey.
  In this example, we support three types of questions:
  (1) Multiple choice questions
  (2) Date selection questions
  (3) Freeform text questions

  Take a close look at how the data for each question is structured.
  What are we storing and why do you think that is?
  What do you think will be displayed for the customer to see?

*/

const SUGGESTION_OR_PROBLEM_QUESTION: types.Question = {
  type: "choice",
  questionText: {
    english: "Would you like to make a suggestion for improvements, or tell us about a problem?",
  },
  required: true,
  single: true,
  choices: [
    {
      key: "problem",
      display: {
        english: "Tell us about a problem",
      },
    },
    {
      key: "suggestion",
      display: {
        english: "Make a suggestion",
      },
    },
  ],
};

const MAKE_SUGGESTION_QUESTION: types.Question = {
  type: "text",
  minLength: 5,
  questionText: {
    english: "What is your suggestion?",
  },
};

const IS_WORK_DIFFICULT_QUESTION: types.Question = {
  type: "choice",
  questionText: {
    english: "Is this making work difficult for you?",
  },
  required: true,
  single: true,
  choices: [
    {
      key: "Yes",
      display: {
        english: "Yes",
      },
    },
    {
      key: "No",
      display: {
        english: "No",
      },
    },
  ],
};

const WHAT_IS_DIFFICULT_QUESTION: types.Question = {
  type: "text",
  minLength: 5,
  questionText: {
    english: "What about this is making work difficult for you?",
  },
};

const WHAT_IS_THE_PROBLEM_QUESTION: types.Question = {
  type: "choice",
  questionText: {
    english: "Is the problem with one of the following:",
  },
  required: true,
  single: true,
  choices: [
    {
      key: "Co-worker",
      display: {
        english: "Co-Worker",
      },
    },
    {
      key: "Environment",
      display: {
        english: "Environment",
      },
    },
    {
      key: "Type",
      display: {
        english: "Type of Work",
      },
    },
    {
      key: "Pay",
      display: {
        english: "Pay",
      },
    },
    {
      key: "Schedule",
      display: {
        english: "Schedule",
      },
    },
  ],
};

const FIX_PROBLEM_QUESTION: types.Question = {
  type: "text",
  minLength: 5,
  questionText: {
    english: "If you could fix the problem, what would you do?",
  },
};

const WHAT_ELSE_QUESTION: types.Question = {
  type: "text",
  minLength: 1,
  questionText: {
    english: "Would you like to tell us anything else?",
  },
};

const CONTACT_DATE_QUESTION: types.Question = {
  type: "date",
  range: "todayAndFuture",
  questionText: {
    english: "If we need to contact you in the next week, what date would work best for you?",
  },
};

const YOUR_NAME_QUESTION: types.Question = {
  type: "text",
  minLength: 1,
  questionText: {
    english: "What is your name?",
  },
};

const CONTACT_METHOD_QUESTION: types.Question = {
  type: "choice",
  questionText: {
    english: "For follow-up, would you prefer to be contacted by email or phone number?",
  },
  required: true,
  single: true,
  choices: [
    {
      key: "Email",
      display: {
        english: "Email",
      },
    },
    {
      key: "Phone",
      display: {
        english: "Phone",
      },
    },
  ],
};

const EMAIL_ADDRESS_QUESTION: types.Question = {
  type: "text",
  questionText: {
    english: "What is your email address?",
  },
};

const PHONE_NUMBER_QUESTION: types.Question = {
  type: "text",
  questionText: {
    english: "What is your phone number?",
  },
};

const CONTACT_TIME_QUESTION: types.Question = {
  type: "choice",
  questionText: {
    english: "For follow-up, when would you prefer to be contacted by email or phone number?",
  },
  required: true,
  single: true,
  choices: [
    {
      key: "Morning",
      display: {
        english: "Morning",
      },
    },
    {
      key: "Afternoon",
      display: {
        english: "Afternoon",
      },
    },
     {
      key: "Early",
      display: {
        english: "Early evening",
      },
    },
     {
      key: "Late",
      display: {
        english: "Late evening",
      },
    },
  ],
};

/*
#####################################################################
                    END SCREENS SECTION
#####################################################################

  This is where we define the possible endings to a survey.
  In this example we just have a generic ending with some text.

*/

const GENERIC_END_SCREEN: types.EndScreen = {
  display: {
    english: "Thank you for letting us know.",
  },
};

/*
#####################################################################
                    STEPS SECTION
#####################################################################

  This section contains the logic of the survey. It determines:
  (1) What steps or in which order should we display the questions?
  (2) Should we ask certain questions only if they answer specifically to a different question?
  You can assume the first node in this section is the first question displayed in the survey.

  Study this data structure carefully. Think through:
  What do you think is happening in the "selections" section?
  How does this relate to the questions and end screens above?
  Does question type matter?
 
*/
const STEPS: types.Steps = {
suggestion_or_problem: {
    ...SUGGESTION_OR_PROBLEM_QUESTION,
    next: {
      selections: [
        {
          name: "suggestion_or_problem",
          answer: "problem",
          next: "is_work_difficult",
        },
        {
          name: "suggestion_or_problem",
          answer: "suggestion",
          next: "make_suggestion",
        },
      ],
  },

make_suggestion: {
    ...MAKE_SUGGESTION_QUESTION,
    next: "what_else",
        },

is_work_difficult: {
    ...IS_WORK_DIFFICULT_QUESTION,
    next: {
      selections: [
        {
          name: "is_work_difficult",
          answer: "Yes",
          next: "what_is_difficult",
        },
        {
          name: "is_work_difficult",
          answer: "No",
          next: "what_is_the_problem",
        },
      ],
  },

what_is_difficult: {
    ...WHAT_IS_DIFFICULT_QUESTION,
    next: "what_is_the_problem",
        },

what_is_the_problem: {
    ...WHAT_IS_THE_PROBLEM_QUESTION,
    next: "fix_problem",
        },

fix_problem: {
    ...FIX_PROBLEM_QUESTION,
    next: "what_else",
        },

what_else: {
    ...WHAT_ELSE_QUESTION,
    next: "contact_date",
        },

contact_date: {
    ...CONTACT_DATE_QUESTION,
    next: "your_name",
        },

your_name: {
    ...YOUR_NAME_QUESTION,
    next: "contact_method",
        },

contact_method: {
    ...CONTACT_METHOD_QUESTION,
    next: {
      selections: [
        {
          name: "contact_method",
          answer: "Email",
          next: "email_address",
        },
        {
          name: "contact_method",
          answer: "Phone",
          next: "phone_number",
        },
      ],
  },

email_address: {
    ...EMAIL_ADDRESS_QUESTION,
    next: "contact_time",
        },

phone_number: {
    ...PHONE_NUMBER_QUESTION,
    next: "contact_time",
        },

contact_time: {
    ...CONTACT_TIME_QUESTION,
    next: "end_step",
        },
  end_step: GENERIC_END_SCREEN,
}
