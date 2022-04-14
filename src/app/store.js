import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice'
import usersSlice from '../features/users/usersSlice'
import notificationsReducer from '../features/notifications/notificationsSlice'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersSlice,
    notifications: notificationsReducer,
  },
})
