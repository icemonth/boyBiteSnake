import React from 'react'
export function asyncLoad(getComponent){
    return class extends React.Component{
        constructor(props){
            super(props)
            this.state={
                Component: null   
            }
        }
        componentWillMount(){
            getComponent().then(({ default: Component }) => {
                this.setState({ Component })
            })
        }
        render(){
            const { Component } = this.state
            return (
                <React.Fragment>
                    { 
                        Component && <Component {...this.props} />
                    }
                </React.Fragment>
            )
        }
    }
}