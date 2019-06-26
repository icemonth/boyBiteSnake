import React from 'react'
import { BuildKey } from 'lib'
const Tback = React.Fragment
export default class extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const { nameList } = this.props
        return (
            <div>
                {
                    nameList.map(
                       letterList => (
                           <Tback key = { letterList.id }>
                               <h3>{ letterList.id }</h3>
                               <ul>
                                   {
                                       letterList.names.map(
                                           name => (
                                               <li key = { BuildKey(name) }>
                                                   <a href = { `/deed/${name}`} target='blank'>{ name }</a>
                                               </li>
                                           )
                                       )
                                   }
                               </ul>
                           </Tback>
                       ) 
                    )
                }
            </div>
        )
    }
}