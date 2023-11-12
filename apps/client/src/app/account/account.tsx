import { Route, Routes } from 'react-router-dom';
import { Login } from './login';

export function Account() {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
    </Routes>
  )
}
