const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const user = require('./schemas/Register');
mongoose.connect('mongodb://127.0.0.1:27017/Rough');


const app = express();
app.use(cors());
app.use(express.json());


app.listen(3001, () => {
  console.log('Server is running!');
});


// CODE TO REGISTER NEW USER..
app.post('/register',async(req,res) => {
try{
  const users = await user.create(req.body);
  res.json(users);
}catch(err){
  res.json(err)
}
});


// CODE TO SHOW ALL DATA TO HOME PAGE WITH SEARCH,FILTER & SORT FUNCTIONALITY,PAGINAION...
app.get('/',async(req,res) => {
  const search = req.query.search || ''
  const gender = req.query.gender || ''
  const status = req.query.status || ''
  const sorting = req.query.sorting || ''
  const page = req.query.page || 1
  const ITEM_PER_PAGE = 5;
  //console.log(req.query)
  const query = {
    fname: {$regex:search,$options:'i'}
  }

  if(gender !== 'all'){
    query.gender = gender
  }

  if(status !== 'allactive'){
    query.status = status
  }

  try{

    const skip = (page - 1) * ITEM_PER_PAGE

    const count = await user.countDocuments(query);
   

    const users = await user.find(query)
    .sort({ createdAt: sorting === 'new' ? -1 : 1 })
    .limit(ITEM_PER_PAGE)
    .skip(skip)

    const pageCount = Math.ceil(count/ITEM_PER_PAGE);

    res.json({
      Pagination:{
      count,pageCount
      },
      users
    });
    }catch(err){
    res.json(err);
    }

    });




//CODE TO SHOW SINGLE USER DETAIL..
app.get('/singleUserDetail/:id',async(req,res) => {
  try{
    const id = req.params.id;
    const users = await user.findOne({_id:id});
    res.json(users);
  }catch(err){
  res.json(err)
  }
})



// CODE TO SHOW DATA WE WANT TO UPDATE ON INPUT FILEDS..
app.get('/updateUser/:id', async (req,res) => {
  try{
    const id = req.params.id;
    const users = await user.findOne({_id:id});
    res.json(users);
  } catch(err){
    res.json(err);
  }
});



// ACTUAL CODE TO UPDATE DATA...
app.put('/updateData/:id',async(req,res) => {
  try{
    const id = req.params.id;
    const updatedUser = await user.findByIdAndUpdate({_id:id},
      {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        number: req.body.number,
        gender: req.body.gender,
        status: req.body.status,
        location: req.body.location,
      },
      {new:true}
      );
      res.json(updatedUser);
  } catch(err){
    res.json(err);
  }
});


// CODE TO DELETE DATA....
app.delete('/deleteUser/:id',async(req,res) => {
  try{
    const id = req.params.id;
    const deletedUser = await user.findByIdAndDelete({_id:id});
    res.json(deletedUser);
  }catch(err){
    res.json(err);
  }
});

