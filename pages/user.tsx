import type { NextPage } from 'next'
import React from 'react';
import styles from '../styles/Home.module.css'

import TodoList from './todoList';

const User: NextPage = () => {

  const [user, setUser] = React.useState('哈哈哈');
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!{user}</a>
        </h1>
        <TodoList />
      </main>
    </div>
  )
}

export default User
