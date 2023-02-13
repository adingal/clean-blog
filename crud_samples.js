const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')

mongoose
  .connect('mongodb://127.0.0.1:27017/my_database')
  .then(() => console.log('DB connection successful'))

/* Create document
 *********************************/
// BlogPost.create(
//   {
//     title: 'The MythBusters Guide to Saving Money on Energy Bills',
//     body: 'If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery opens up. You know those bullet-point lists. You start spotting them everything at this time of year.They go like this:',
//   },
//   (err, blogpost) => console.log(err, blogpost)
// )

/* Read/Find all document
 *********************************/
// BlogPost.find({}, (err, blogpost) => console.log(err, blogpost))

/* Update single document by id
 *********************************/
// BlogPost.findByIdAndUpdate(
//   '63dd5fbb908410463472c563',
//   { title: 'The MythBusters Guide to Saving Money on Energy Bills' },
//   (err, blogpost) => console.log(err, blogpost)
// )

/* Delete single document by id
 *********************************/
// BlogPost.findByIdAndDelete('63dd5fbb908410463472c563', (err, blogpost) =>
//   console.log(err, blogpost)
// )
