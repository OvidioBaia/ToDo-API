const taskModel = require('../model/task');
const mysql = require('mysql');

async function  execSQLQuery(sqlQry, res){
  const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    database : 'tasks'
  });
 
  connection.query(sqlQry, async function(error, results, fields){
      if(error) 
        res.json(error);
      else
        await  res.json(results);
      connection.end();
      console.log('executou!');
  });
}
exports.create = async (req, res) =>{
    const nome = req.body.nome;
    await execSQLQuery(`INSERT INTO tasks(nome) VALUES('${nome}')`, res);
};

exports.show = async (req, res) =>{
    await execSQLQuery('SELECT * FROM tasks', res);
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

// exports.delete = async (req, res) =>{
//     try {
//         const usuario = await userModel.deleteOne(req.body.id);
//        // console.log(usuario)
//         res.status(200).send("Usuario deletado com sucesso");
//     } catch (error) {
//         console.log(erro)
//         res.send(erro);
//     }
//    // res.send('Olá! Teste ao Controller');
// };