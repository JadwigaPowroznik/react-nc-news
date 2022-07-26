import {useEffect, useState} from 'react'
import * as api from '../api'

function TopicsList (){

    const [topics, setTopics] = useState([])
    useEffect(()=>{
       api.getTopics().then((topicsAPI)=>{
        setTopics(topicsAPI)
       })
    }, [])

    return (<section className="topicsList">
    <h2 className="listOfTopics">List of topics :</h2>
    <ul className="listOfTopics">
        { topics.map((topic, index)=>{
            return <li key={index}>
                {topic.slug}
                </li>
        })}
    </ul>
 </section>  )
}

export default TopicsList