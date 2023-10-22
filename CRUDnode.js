 //Create
  /*try {
    const insertData = await collection.insertMany([
      {
        name:"Florent_2",
        age:34,
        sexe:"masculin",
        hobby:'Coding'
      },
      {
        name:"Adrien_2",
        age:38,
        sexe:"masculin",
        hobby:'Fishing'
      },
      {
        name:"Katia_2",
        age:33,
        sexe:"féminin",
        hobby:'Hicking'
      },
    ]);
    console.log(`Documents insérés => ${insertData}`);
  } catch(e) {

    throw e;

  }

  //Read
  try {
    const findData = await collection.findOne({name : "Florent_2"});
    console.log(findData);

    const findMultiData = await collection.find({hobby: "Coding"});
    console.log(await findMultiData.toArray());

  } catch(e) {

    throw e;

  }

  //Update
  try {
    
    const updatePierre = await collection.updateOne({name : "Florent_2"}, {
      $set: {name: 'Florent_3', sexe: 'True'}
    });
  } catch(e) {
    throw e;
  }
  //Delete
  try {

    const deleteOne = await collection.delete({name:"Florent"},{name:"Adrien"},{name:"Katia"});
    const test = await collection.deleteOne({name:"Florent"});
    const test2 = await collection.deleteOne({name:"Adrien"});
    const test3 = await collection.deleteOne({name:"Katia"});
    const deleteEveryOne = await collection.deleteMany({age:38});

  } catch(e) {

    throw e;

  }
  return 'Done';
}

test()
.then(console.log)
.catch(console.error)
.finally(() => client.close());*/