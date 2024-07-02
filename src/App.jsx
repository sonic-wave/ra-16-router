import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Posts } from './components/Posts/Posts';
import { New } from './components/New/New';
import { Edit } from './components/Edit/Edit';
import { useEffect, useState } from 'react';
import { Post } from './components/Post/Post';

function App() {
  const [posts, setPosts] = useState([]);
  const [postInfo, setPostInfo] = useState('');

  const localhost = 'https://ra-16-router-back.onrender.com/posts';

  async function createRequest(data) {
    if (data.method === 'GET') {
      try {
        const response = await fetch(localhost);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Fetched notes GET:", result);
        setPosts([...result]);

      } catch (error) {
        console.error('Failed to fetch notes:', error);
      }
    }

    if (data.method === 'POST') {
      try {
        const response = await fetch(localhost, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }, body: JSON.stringify({ content: data.content })
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        await createRequest({ method: 'GET' });
      } catch (error) {
        console.error('Failed to post notes:', error);
      }
    }

    if (data.method === 'PUT') {
      try {
        const response = await fetch(`${localhost}/${data.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          }, body: JSON.stringify({ id: data.id, content: data.content })
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        await createRequest({ method: 'GET' });
      } catch (error) {
        console.error('Failed to post notes:', error);
      }
    }

    if (data.method === 'DELETE') {
      try {
        const response = await fetch(`${localhost}/${data.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        await createRequest({ method: 'GET' });
      } catch (error) {
        console.error('Failed to post notes:', error);
      }
    }
  }

  useEffect(() => {
    const data = {
      method: 'GET'
    }
    createRequest(data)
  }, [])

  const onClickHandler = (value) => {
    const data = {
      content: value,
      method: 'POST'
    }
    createRequest(data);
  }


  const editHandler = (post, navigate) => {
    console.log(post)
    setPostInfo({...post});
    console.log(postInfo)
    navigate('/posts/edit'); 
  }

  const deleteHandler = (id, navigate) => {
    const data = {
      id: id,
      method: 'DELETE'
    }
    createRequest(data);
    navigate('/'); 
  }

  const onSubmitHandler = (value) => {
    const data = {
      id: value.id,
      content: value.content,
      method: 'PUT'
    }
    createRequest(data);
  }

  return (
    <Router basename='/ra-16-router'>
      <div>
        <div className="page">
          <Routes>
            <Route path="/" exact element={<Posts posts={posts} />} />
            <Route path="/posts/:id" element={<Post handlers={{editHandler, deleteHandler}} />} />
            <Route path="/posts/new" element={<New onClickHandler={onClickHandler}/>} />
            <Route path="/posts/edit" element={<Edit onSubmitHandler={onSubmitHandler} postInfo={postInfo} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App
