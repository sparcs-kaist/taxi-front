import { Component } from 'react';

class WhiteContainer extends Component {
    constructor(props){
        super(props);
        this.styleBox = { background: 'white' }
        this.styleTitle = { fontSize: '22px', fontWeight: 900 }
    }
    render(){
        return (
            <>
                <div style={ this.styleBox }>
                    <div className="lay_auto">
                        <div style={{ padding: '15px' }}>
                            <div style={ this.styleTitle }>{ this.props.title }</div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default WhiteContainer;