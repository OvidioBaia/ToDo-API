const taskModel = require('../model/task');
const mysql = require('mysql');
const moment = require('moment');

async function  execSQLQuery(sqlQry, res){
  const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    database : 'tasks'
  });
 
  connection.query(sqlQry, async function(error, results, fields){
    console.log(sqlQry);
      if(error){ 
        res.json(error);
      }
      else{
        const response = results.length > 0 ?  results.map((r)=>{
          r.date = moment(r.date).format('DD-MM-YYYY')
        }
        ): results
        await  res.json(results);
      }
      connection.end();
      console.log('executou!');
  });
}
exports.create = async (req, res) =>{
    const {titulo,description, date:dataRecieve} = req.body;
    const date = moment(dataRecieve).format('YYYY-MM-DD')
  
    await execSQLQuery(`INSERT INTO tasks(titulo, description, date) VALUES('${titulo}', '${description}', '${date}' )`, res);
};

exports.show = async (req, res) =>{
    await execSQLQuery('SELECT * FROM tasks', res);
};
exports.video = async (req, res) =>{
  await execSQLQuery('SELECT * FROM videos', res);
};

// exports.details = async (req,res)=>{
//     try {
//         const usuario = await userModel.findById(req.params.id);
//         //console.log(usuario)
//         res.send(usuario);
//     } catch (error) {
//         console.log(erro)
//         res.send(erro);
//     }
// }

// exports.update = async (req,res)=>{
//     try {
//         const usuario = await userModel.updateOne(req.body);
//         const user = await userModel.findById(req.params.id);
//         res.status(200).send(user);
//     } catch (error) {
//         console.log(erro)
//         res.send(erro);
//     }
// }

exports.delete = async (req, res) =>{
  const { id } = req.params;
  console.log(id);
  await execSQLQuery(`DELETE FROM tasks WHERE id = ${id}`, res);
  // await execSQLQuery('SELECT * FROM tasks', res);
};