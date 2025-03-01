# Loan Calculator

Hi! I've left some basic setup info here, in case it's required. Further notes on the project have either been listed at the bottom of this file, or through the project, just to add some context to decisions.

## Node Version

This project is using node version v22.11.0

Please install this, or run (to automatically use the version defined):

    nvm use

## Running Locally

To run the app locally, run these two commands in order:

    npm install
    npm start

To run the tests, run:

    npm test

## Notes

Overall, I probably spent about 3 hours on this project. I ran over a little, as I spent a while remembering how to setup a Vite project (all the config etc) as it's something I've done infrequently.

Ran out of time to write more tests, but below are some examples of what I would have written. Hopefully I've demonstrated how I'd go about it.

Other points:

- I wasn't sure whether the document describing the project requirements was asking for a table of each day of a set loan, or just an overall summary. I went with the overall summary, but can explain how I'd have approached the former if that's useful. (I would have asked, but it was Saturday 😊)
- I wasn't sure what was meant by displaying the accrual date, so I just went with the start of the loan. It wasn't listed as an input.
- I ran out of time to add validation, but this would have been fairly simple, either with a library like Yup, or just some custom logic. For now I've relied on the 'required' attributes.

Some libraries/frameworks used:

- React
- Vite
- Vitest
- Testing Library
- Material UI - I chose this as it is well documented, quick to prototype with and is well battle-tested for UI concerns. It
  also looks clean.
- Formik - Form library I'm used to. Not strictly necessary, but again just faster for prototyping
- Tests, as above, here is a list of other considerations:
  - it displys correct pending state if loan hasn't been calculated and/or no saved loans.
  - it successfully loads saved loans and updates UI
  - it successfully saves calculated loans and updates UI
  - it displays correct error messages if validation isn't passed
  - it shows an error if start date is before end date
