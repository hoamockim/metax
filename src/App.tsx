import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Spinner from './components/Spinner/spinner.components'
import routes from './routes'

function App() {
  return (
    <Suspense fallback={<Spinner/>}>
      <Routes>
      {routes.map((item, i) => (
          <Route
            key={i}
            path={item.path}
            element={item.component()}
          />
        ))}
      </Routes>
    </Suspense>
  );
}

export default App;

/**
 *  <div className="App">
      <header className="App-header">
        <SignUp/>
      </header>
    </div>
 */
