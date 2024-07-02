import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import './Posts.css'

export const Posts = ({ posts }) => {

    const navigate = useNavigate();

    const handlePostClick = (post) => {
        navigate(`/posts/${post.id}`, { state: { post } });
    };

    return (
        <div className='posts-container'>
            <NavLink className='post-createBtn' to={'/posts/new'}>Создать пост</NavLink>
            {posts.map((post) => (
                <div className='post-component' key={post.id} onClick={() => handlePostClick(post)}>
                    <div className='post-info'>
                        <img className='post-avatar' src='https://cs2.livemaster.ru/storage/f2/ae/61d04246632ceea41d0788fb68ar--kartiny-i-panno-kartina-ushastyj-kotenok-50h50-holst-maslo.jpg' alt='Аватар' />
                        <div className='post-additional-info'>
                            <div className='post-name'>Имя Фамилия</div>
                            <div className='post-created'>{post.created}</div>
                        </div>
                        {/* <NavLink className='post-card' to={`/posts/${post.id}`}>&#10095;</NavLink> */}
                    </div>
                    <div className='post-content'>{post.content}</div>
                </div>
            ))}
        </div>
    )
}


// import { useState, useEffect, Suspense } from "react";
// import './Posts.css'
// import { Link, useLoaderData, Await } from "react-router-dom";

// export const Posts = () => {
//   const { posts } = useLoaderData();

//   return (
//     <div className='main-container'>
//         <Suspense fallback={<p>Loading...</p>}>
//           <Await resolve={posts}>
//             {(_posts ) => (
//               <>
//                 {_posts.map((post) => (
                    
//                     <div className='post-component' key={post.id} onClick={postClickHandler}>
//                     <div className='post-info'>
//                         <img className='post-avatar' src='https://cs2.livemaster.ru/storage/f2/ae/61d04246632ceea41d0788fb68ar--kartiny-i-panno-kartina-ushastyj-kotenok-50h50-holst-maslo.jpg' alt='Аватар' />
//                         <div className='post-additional-info'>
//                             <div className='post-name'>Имя Фамилия</div>
//                             <div className='post-created'>{post.created}</div>
//                         </div>
//                         <Link to={`/posts/${post.id}`}>{post.title}</Link>
//                         </div>
//                     <div className='post-content'>{post.content}</div>
//                 </div>
                    
//                 ))}
//               </>
//             )}
//           </Await>
//         </Suspense>
//     </div>
//   );
// };
