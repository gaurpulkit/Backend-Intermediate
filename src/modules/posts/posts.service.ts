import { Inject, Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
    constructor(
        @Inject('POSTS_REPOSITORY')
        private postsRepository: typeof Post
      ) {}

    async findAll(): Promise<Post[]> {
        return this.postsRepository.findAll<Post>();
    }
      
    async create(user: User, postContent: any): Promise<Post> {
        const post = new Post();
        let dataSaved:any;
        post.postContent = postContent;
        post.creatorEmail = user.email;

        return post.save().then(data => {
            dataSaved=data
            return dataSaved.dataValues;
        })
        .catch(error => {
            console.log(error)
        });;
            
    }
}