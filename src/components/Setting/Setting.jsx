  
import React, { Component } from 'react';

class Setting extends Component {
    constructor(props){
        super(props);
        this.styleBox = { background: 'white' }
        this.styleProfBorder = {
            position: 'absolute', left: '0px', top: '0px',
            width: '60px', height: '60px', borderRadius: '30px',
            overflow: 'hidden', border: '1px solid gray', background: 'white'
        }
        this.styleProf = {
            width: '100%', height: '100%'
        }
    }
    render() {
        return (
            <>
                <div style={ this.styleBox }>
                    <div className="lay_auto">
                        <div style={{ padding: '15px' }}>
                            <div style={{ position: 'relative', height: '60px' }}>
                                <div style={ this.styleProfBorder }>
                                    <img style={ this.styleProf }/>
                                </div>
                                <div>김건</div>
                                <div>20190052</div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Setting;