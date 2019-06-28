import React from 'react'
import NameIndex from 'component/NameIndex'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'
import { getRouter } from 'router'
import mockdata from 'mock'
import './index.less'

export default class Main extends React.Component{
    render(){
        return (
            <Provider store={store}>
                <div className='container'>
                    <nav>
                        <NameIndex nameList={mockdata} />
                    </nav>
                    <section>
                        {
                            getRouter()
                        }
                    </section>
                </div>
            </Provider>
        )
    }
} 
