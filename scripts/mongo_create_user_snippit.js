db.createUser({
    //  user and password removed for security purposes
    user: 'xxxx', 
    pwd: 'xxxx',
    roles: [
        { role: 'root', db:'admin'},
        { role: 'readWrite', db:'viscrime'}
    ]
})