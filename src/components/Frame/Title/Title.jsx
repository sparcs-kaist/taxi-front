const Title = (props) => {
    return (
        <div className="lay_auto ND" style={{ position: 'relative', paddingTop: '10px', paddingBottom: '10px' }}>
            <img src={ props.img } style={{ position: 'absolute', top: '10px', left: '0px', width: '37px', height: '37px' }}/>
            <div style={{ marginLeft: '45px', lineHeight: '37px', fontSize: '24px' , fontWeight: 500, color: '#663D71' }}>{ props.children }</div>
        </div>
    )
}

export default Title;