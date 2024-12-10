const User = require("../model/User");
const bcrypt = require("bcryptjs");

const getAllUser = async(req,res,next) => {
    let users;

    try{
        users = await User.find();
    }
    catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({ message : "users are not found"})
    }

    return res.status(200).json({users});
}

const signUp = async(req,res,next) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({email});
        
        if(existingUser) {
            return res.status(400).json({message: "User already exists!"});
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            blogs: []
        });

        await user.save();
        return res.status(201).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch(err) {
        console.error(err);
        return res.status(500).json({message: "Server error during signup"});
    }
};

const logIn = async(req,res,next) => {
    const { email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({email});
        
        if(!existingUser) {
            return res.status(404).json({message: "User not found"});
        }

        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

        if(!isPasswordCorrect) {
            return res.status(401).json({message: "Invalid credentials"});
        }

        return res.status(200).json({
            user: {
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email
            }
        });

    } catch(err) {
        console.error(err);
        return res.status(500).json({message: "Server error during login"});
    }
};

module.exports = { getAllUser, signUp, logIn };