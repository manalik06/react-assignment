import React, { Component } from "react";
import { Alert } from '@material-ui/lab';
class AlertMessage extends Component {
    constructor(){
        super()
        this.state={
            isMounted:false
        }
    }
    render() {
        const { type, message,key } = this.props
        return (
            <Alert
            className="margin-top-10"
            key={key || Math.random()}
            onClose={this.closerAlertMessage.bind(this)} severity={type}> {message}</Alert>
        )
    }
    closerAlertMessage() {
        setTimeout(() => {
            this.props.closeAlert(this.props.id);
        }, 300);
    }
    componentDidMount(){
        this.setState({
            isMounted:true
        })
        window.setTimeout(() => {
            if (this.state.isMounted) {                
                setTimeout(() => {
                    this.props.closeAlert(this.props.id);
                }, 300);
            }
        },5000);
    }
    componentWillUnmount(){
        this.setState({
            isMounted:false
        })
    }

}




export default AlertMessage
