const { Pool } = require('pg');
const { config } = require('dotenv')

config();

const pool = new Pool({
<<<<<<< HEAD
   /* host: 'localhost',
    user: 'postgres',
    password: '12345',
    database: 'firstapi',
    port: '5435'*/
    connectionString: process.env.DATABASE_URL,
    ssl: true
=======
    host: 'https://rest-api-node-postgres.onrender.com',
    user: 'postgres',
    password: '12345',
    database: 'firstapi',
    port: '5432'
>>>>>>> f8a95b9d8710771029c907056adf41958c739596

});
const getUsers = async (req,res) =>{

    const response = await pool.query('SELECT * FROM users');
    res.status(200).json(response.rows);
};

const getUserById = async(req, res) =>{
   /* res.send('User ID ' + req.param.id);*/
   const id = req.params.id;
   const response = await pool.query('SELECT * FROM users WHERE id = $1', [id] );
   res.json(response.rows);
};

const createUsers = async(req, res) =>{
    const {name, email} = req.body;
    const  response = await pool.query('INSERT INTO users (name,email) VALUES ($1,$2)', [name,email]);
    console.log(response);
    res.json({
        message: 'User Added Succesfully',
        body:{
            user: {name, email}
        }
    })
};

const deleteUser = async(req,res) =>{
  const id = req.params.id;
  const response = await pool.query('DELETE FROM users WHERE id = $1', [id]);
  console.log(response);
  res.json(`User ${id} deleted succesfully`);
};

const updateUser = async(req, res)=>{
    const id = req.params.id;
    const {name, email} = req.body;
    const response = await pool.query('UPDATE users SET name= $1, email = $2 WHERE id = $3',[name,email, id]);
    console.log(response);
    res.json('User Updated');
};

module.exports = {
    getUsers, 
    getUserById,
    createUsers,
    deleteUser,
    updateUser
}
