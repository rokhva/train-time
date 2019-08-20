# train-time

#1 Problem Statement
This app allows the user to enter in a train name, departing time, destination, and frequency of arrival. Upon hitting submit the trian information will appear in the table to the right. The user will be able to view the next arriving train, and how many minutes away it is. In addition to the information from the form.

#2 High Level Overview of App Organization
Primary states of the web app (and thier abilities)
1 - Landing page (the use can view the prepopulated trains or add one of their own)
2 - Form submit (when the user has filled out all of the fields of the form, and pressed sumbit the table will update)

#3 Start to Finish Instructions
- On screen load - 
The prepopulated information in the table will show
There will be a black form for the users to fill out

- On submit -
Once the form is comoletely filled out and submitted the information will show up on the table

- Table update -
The firebase database will be updated with the users info and basic calculations will be preformed to populate the last two colomns

#4 Link to Deployed Version of the App
https://rokhva.github.io/train-time/