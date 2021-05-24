import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


import User from '../../models/User.js';
import config from '../../config.js';

const { SALT_ROUNDS, SECRET_KEY } = config;

const resolvers = {
    Mutation: {
        async register(_, { registerInput }) {
            try {
                const { password, username, confirmPassword, email } = registerInput;
                const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
                console.log(">>>>>", password, hashedPassword);
                const newUser =  new User({
                    username,
                    password: hashedPassword,
                    email,
                    createdAt: new Date().toISOString()
                })
                const res = await newUser.save();
                console.log("res>>>", res._doc);

                const token = jwt.sign({
                    id: res._id,
                    email: res.email,
                    username: res.username,
                }, SECRET_KEY, { expiresIn: 60 * 60 })
                
                return {
                    ...res._doc,
                    id: res._id,
                    token 
                }
            } catch(error) {
                throw new Error(error)
            }

        }
        
    }
};

export default resolvers;