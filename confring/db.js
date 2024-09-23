const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mkirtan013:KvJNO0YeJrikMEFt@cluster0.egcsg.mongodb.net/adminPanel')
    .then(() => console.log('Connected!')).catch((err) => {
        console.log('error');
    })

    