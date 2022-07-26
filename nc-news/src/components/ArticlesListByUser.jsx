import {useEffect, useState, useContext} from 'react'
import { Link } from 'react-router-dom'

import * as api from '../api'
import {UserContext} from '../contexts/User'

function ArticlesListByUser (){

    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {user} = useContext(UserContext)

    useEffect(()=>{
        setIsLoading(true)
       api.getArticles().then((articlesAPI)=>{
        setArticles(articlesAPI)
        setIsLoading(false)
       })
    }, [])

    let articlesByUser = articles.filter(article=>{
        if(article.author === user.username){ return article}
    })
    let h3 = <h3>Your current articles :</h3>
    if(articlesByUser.length === 0){
        h3 = <h3>No articles found!</h3>
    }

    return (<section >{isLoading ? <p>Loading...</p>:
    <div>
    {h3}
    <ul className="listOfArticlesByUser">
        { articlesByUser.map((article, index)=>{
            return <li key={index} className="listOfArticlesByUserLI">
                <Link to={`/api/articles/${article.article_id}`}>{article.title}</Link>
                </li>
        })}
    </ul>
    </div>}
 </section>  )
}

export default ArticlesListByUser