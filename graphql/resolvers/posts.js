import Posts from '../../models/Post.js';


const resolvers = {
    Query: {
        async getPosts(){
            try {
              const posts = await Posts.find();
              return posts
            } catch(error) {
                throw new Error(error)

            }
        }
    }
}

export default resolvers;