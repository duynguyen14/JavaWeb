import { useState } from 'react'
import Home from './pages/Admin'
import { PublicPage } from './pages'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ScrollToTop from './components/OtherComponent/ScrollToTop'
function App() {
  return (
    <Router>
      <div>
      <ScrollToTop/>
        <Routes>
          {
            PublicPage.map((page,index)=>{
              const Page =page.component;
              const Layout =page.layout;
              if(Layout==null){
                return(
                  <Route
                  key={index} path={page.path} element={<Page/>}
                  />
                )
              }
              else{
                return(
                  <Route
                  key={index} path={page.path} element={
                    <Layout>
                        <Page/>
                    </Layout>
                  } 
                  />
                )
              }
            })
          }

        </Routes>
      </div>
    </Router>
  )
}
export default App
