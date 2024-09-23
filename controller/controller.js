const modeal = require('../models/modeal');
const authModual = require('../models/modeal');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const defaultCon = async(req, res) => {

    if (req.cookies.userId) {
        console.log("done");
        const userD = await modeal.find({})
        res.render('index',{userD});
    } else {
        console.log("error");

        res.redirect('/login')
    }
}

const signIn = (req, res) => {

    // console.log(req.cookies);
    // if (req.cookies.name === 'kirtan') {
    // } else {
    //     console.log('somthing Went Wrong');
    // }
    res.render('signIn')


}

const loginPage = (req, res) => {
    res.render('login')
}

const userGetData = async (req, res) => {

    console.log('userData', req.body);
    if (req.body.password === req.body.coPassword) {
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        try {
            const userInfo = {
                userName:req.body.userName,
                email: req.body.email,
                password: hash
            }

            const usersData = new authModual(userInfo);
            await usersData.save();

            res.redirect('/login')

        } catch (err) {
            res.send("your email is alrady exicted")
        }

    } else {
        res.redirect('/signin');
    }

}



const logInGetData = async (req, res) => {
    const userData = await authModual.find({ email: req.body.email })

    console.log('userDatata', userData);


    if (userData) {
        bcrypt.compare(req.body.password, userData[0].password, async (err, result) => {
            if (!err) {
                res.cookie('userId', userData[0]._id.toString());
                res.redirect('/')
            } else {
                res.redirect('/login')
            }
        });
    } else {
        console.log("not done");
    }
}

module.exports = { defaultCon, signIn, loginPage, userGetData, logInGetData }