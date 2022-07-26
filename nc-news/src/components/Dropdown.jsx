import React, {useEffect, useState} from 'react';
//import {MenuItems} from './MenuItems'
import {Link} from 'react-router-dom' 
import './componentsCSS/Dropdown.css'
import * as api from '../api'

function Dropdown(){
    const [click, setClick] = useState(false)
    const [categories, setCategory] = useState([])

    let MenuItems = [
      {  topic: 'All',
          path: '/articles',
          name: 'dropdown-link'
        }]

    const handleClick=()=>setClick(!click)

    useEffect(()=>{
             api.getTopics().then((categoriesAPI)=>{
              setCategory(categoriesAPI)
             })
          }, [])
   
      categories.forEach(top =>{
        let topic = top.slug
        
        MenuItems.push({
            topic: `${topic}`,
            path: `/topics/${topic}`,
            name: 'dropdown-link'
          })
      })

    return(
        <>
        <ul 
        onClick={handleClick}
        className={click? 'dropdown-menu clicked' : 'dropdown-menu'}
        >
            {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.name}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.topic}
              </Link>
            </li>
          );
        })}
        </ul>
        </>
    )
}

export default Dropdown