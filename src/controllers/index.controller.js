const { Pool } = require('pg');
const { config } = require('dotenv')

config();

const pool = new Pool({
    host: 'dpg-copqbmkf7o1s73e53n8g-a.oregon-postgres.render.com',
    user: 'cristian',
    password: 'P71ns5Htng2h0oUyL4gYqhYa0k1Th9mw',
    database: 'firtapi',
    port: '5432',
    ssl: true,
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
