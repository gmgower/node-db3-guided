//? s5
const db = require('../data/db-config.js');

//? s7
function find(){
    return db('users');
}

//?s11
function findById(id){
    return db('users').where({id});
}

//?s13
function findPosts(id){
    return db('posts as p')
    .join('users as u', 'u.id', 'p.user_id')
    .select('p.id', 'u.username', 'p.contents')
    .where({user_id:id})
}

//? s16
function add(userData) {
    return db('users').insert(userData);
}

//? s18
function update(changes, id) {
    return db('users').where({id}).update(changes);
}

//? s20
function remove(id) {
    return db('users').where({id}).del();
}

//? s6
module.exports = {
    find,
    findById,
    findPosts,
    add, 
    update,
    remove    
}

