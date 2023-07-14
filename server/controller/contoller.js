const fs = require(`fs`)
const path = require(`path`);
const filepath = `./server/database/data.json`
const fileContents = fs.readFileSync(filepath,`utf-8`)
const data = JSON.parse(fileContents);

//create and save new user 
exports.create = (req,res)=>{
// validate request
if(!req.body){
    res.status(400).send({message:`Content cannot be empty`})
    return
}

const user = {
    id: data.length + 1,
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender
} 

data.push(user)
fs.writeFileSync(filepath,JSON.stringify(data))
res.redirect(`/add-user`)
}

// retrieve and return all users/ retrieve and return a single user
exports.find = (req,res)=>{
    if(data){
        res.send(data)
    }else{
        res.status(500).send({message:error.message || `User data not found`})
    }
}

exports.findById = (req, res) => {
    const userId = req.params.id;
    const user = data.find((item) => item.id === parseInt(userId));
  
    if (user) {
      res.send(user);
    } else {
      res.status(500).send({ message: error.message || "User Data not found" });
    }
  }  
// update a new identified user by user id
exports.update = (req,res)=>{

    if(!req.body){
        res.status(400).send({message: `Data to update can't be empty`})
        return
    }
    const userId = req.params.id

    const updatedData = req.body

    let index = data.findIndex(e=>e.id == userId)

    if(index !== -1){
        data[index]={
            id : parseInt(userId),
            name : updatedData.name,
            email : updatedData.email,
            gender : updatedData.gender
        }
        fs.writeFileSync(filepath,JSON.stringify(data))
        res.status(200).send('<Script>alert(Form Submitted Succesfully!)</script>')
    }
    else res.status(404).send(`No data found`)

    
}   

// delete a user with specified user id in the request
exports.delete = (req,res)=>{
    // console.log('reached');
    if (!req.body) {
        res.status(400).send({ message: "Need to specify an id for deletion" });
        return;
      }
      const id = req.params.id;
    
      const index = data.findIndex(obj => obj.id === parseInt(id));
      if (index !== -1) {
        data.splice(index, 1);
      }
      for (let i = 0; i < data.length; i++) {
        data[i].id = i + 1;
      }
      fs.writeFileSync(filepath, JSON.stringify(data));
      res.status(200).send('<script>alert(Data Deleted Successfully!);</script>')
}

