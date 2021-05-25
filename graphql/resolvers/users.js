import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import apolloServer from 'apollo-server';


import User from '../../models/User.js';
import config from '../../config.js';
import validators from './utils/user-validator.js'


const { UserInputError } = apolloServer;

const { SALT_ROUNDS, SECRET_KEY } = config;

const resolvers = {
    Mutation: {
        async register(_, { registerInput }) {
            try {
                const { password, username, email } = registerInput;
                const { errors, valid } = validators.validateRegisterInput(registerInput);
                console.log(">>>errors", errors, valid)

                // Validate user data
                if (!valid) {
                    throw new UserInputError('Errors', { errors });
                  }
                
                // Check if user exists
                const existingUser = await User.findOne({ username });

                if(existingUser) {
                    throw new UserInputError('Username is already taken!', {
                        errors: {
                            username: "This username is already taken"
                        }
                    })
                }
                const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

                const newUser =  new User({
                    username,
                    password: hashedPassword,
                    email,
                    createdAt: new Date().toISOString()
                })
                const res = await newUser.save();

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