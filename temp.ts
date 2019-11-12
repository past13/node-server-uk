// const location = new ObjectID("5dc9562e5b91b11758ccb7fa");
// const project = new ObjectID("5dc972b59580496d78c00ecf");

// User.remove({ _id: userId, projects: { $in: projectsExist}}, function(err: any) {
//     return err;
// });

//  User.deleteMany({ _id: userId, projects: { $in: projectId}}, function(err) {
//     return err;
//  });

// const user = await Users.findById({ _id: userId }).lean().exec(async (err, user) => {
//     if (user) {
//         var resultPosts = user.projects.map(function(project: any) {
//             console.log(project);
//         });
//     }
// });



//1. return specific fields description and name coz of 1 if 0 will return all fields except those two
// var fields = { 'description': 1, 'name': 1 };
// result = Projects.findById({_id: projectId }).select(fields);

//2. update those fields 
// result = Projects.updateOne({ _id: projectId },{$set:{name: name,
                                                                //email: email}});
//3. update nested property but overrides all fields
// result = Projects.updateOne({_id: projectId},{location: { name: name }});

//4. 
// const result = Projects.findOneAndUpdate(query, updatedata, {upsert:true}, function(err, doc){
//     if (err) {
//         return { error: err }
//     }
//     return "success";
// });

// result = Projects.update(
//     { 
//         _id: projectId,
//         "location._id": 
//     },
//     { 
//         $set:{n