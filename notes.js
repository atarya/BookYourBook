--Get > popular books

// Check if the user is logged in
// Check for active membership

// 1. sort the books by average rating (descending)
// 2. sort by books with maximum count of reviews (descending)
// 3. sort by books with maximum count of exchanges (descending)
// 4. limit to the first 100 books
// 5. paginate and send the total count of pages by (100/total count per page)

--Get > searched books

// Check if the user is logged in
// Check for active membership

// 1. get books matching the search query in the fields title, author, description, genre
// 2. filter books with selected availability
// 3. exclude books of the logged in user
// 4. paginate

// if returned an empty list of books, show a message : "No books found"

--Get > single book details

// Check if the user is logged in
// Check for active membership

// 1. get book with the given id

--Get > book by user

// Check if the user is logged in
// Check for active membership

// 1. get books of the user id provided in params 
// if no user ID provided then get books of the logged in user
// 2. paginate

--Get > user membership

// Check if the user is logged in
// 1. get membership of the user logged in

--Middleware > (exclusive)

// 1. takes the logged in user id
// 2. fetch the membership of the user
// 3. if expiry_date >= today then pass the request to next
// 4. if expiry_date < today then return a response with status code 403 and message "Your membership has expired")

// this needs to be on all exchange and book routes

--Post > create a membership_document

// as soon as the user creates an account, a membership document is created in his name with the expiry date set to today + 7 days
// & teansaction details as trial
// check triggers/transactions for this

--Put > update membership

// Check if the user is logged in

// 1. get the user membership details and check expiry_date <= today + 7 days
// 2. if (expiry_date <= today) { then update the expiry_date to now + 1 year } else {expiry_date = expiry_date + 1 year}

--Logout > ??

    // Check if the user is logged in

    --Get > user

// Check if the user is logged in

// 1. get req.user._id
// 2. get user details

--Put > update user

// Check if the user is logged in

// 1. get req.user._id
// 2. check that the logged in user is updating his own details only

--Post > create a new book

// Check if the user is logged in
// Check for active membership

// 1. get the logged in user id
// 2. create a new book with the owner as the logged in user

// add a field to count the number of exchanges

--Post > create a new user

// check that the user doesn't exist already
// check the reference user exists
// register a user 
// create a membership document in his name with the expiry date set to today + 7 days
// & teansaction details as trial
// add user's 5 favorite tags while registering

--Delete > delete a book

// Check if the user is logged in
// Check for active membership

// 1. get the book id
// 2. check that the logged in user is the owner of the book
// 3. delete the book

--put > update a book

// Check if the user is logged in
// Check for active membership

// 1. get the book id
// 2. check that the logged in user is the owner of the book

// add a field to count the number of exchanges
// update book available status

// update the book review & rating
// get the book id from the exchange document
// check the reviewed in exchange is false
// check the logged in user is the borrower of the exchange
// save the review and rating
// update the reviewed in exchange to true


--post > exchange a book DONE

// Check if the user is logged in
// Check for active membership
// Check for availability of the book
// create a new exchange document
// set the borrower as the logged in user
// set the lender as the book owner
// set the book_id as the book id provided in the request
// set the status as "requested"

--get > exchanges : borrow DONE

// Check if the user is logged in
// Check for active membership

// 1. get the logged in user id
// 2. get the exchanges where the borrower is the logged in user
// 3. sort by the date of the exchange
// 4. paginate

--get > exchanges : lend DONE

// Check if the user is logged in
// Check for active membership

// 1. get the logged in user id
// 2. get the exchanges where the lender is the logged in user
// 3. sort by the date of the exchange
// 4. paginate

--put > update exchange DONE

// Check if the user is logged in
// Check for active membership

// 1. get the exchange id

// approve the exchange > change the status to "approved"
            // only if the lender is the logged in user
            // only if the status is "requested"
            // only if the book is available
            // update the status as exchanged
            // update the book available as false
            // set the borrow date as now
            // set the return date as now + 7 days

// reject the exchange > change the status to "rejected"
            // only if the lender is the logged in user
            // only if the status is "requested"
            // update the status as rejected

// return the exchange > change the status to "returned"
            // only if the lender is the logged in user
            // only if the status is "approved"
            // update the status as returned
            // update the book available as true
            // update the book count of exchanges
            // set the return date as now

Ask Vaulstein how to handle societies and locations to replicate the swiggy model ??????