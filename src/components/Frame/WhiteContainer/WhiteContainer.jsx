import { Component } from 'react';

class WhiteContainer extends Component {
    constructor(props){
        super(props);
        this.styleBox = { background: 'white' }
        this.styleTitle = {
            marginBottom: '10px',
            fontSize: '22px', fontWeight: 900
        }
    }
    render(){
        return (
            <>
                <div style={ this.styleBox }>
                    <div className="lay_auto">
                        <div style={{ padding: '20px' }}>
                            <div style={ this.styleTitle }>{ this.props.title }</div>
                            <div>{ this.props.children }</div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default WhiteContainer;