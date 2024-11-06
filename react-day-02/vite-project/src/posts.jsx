const style = { width: 200, backgroundColor: "white", borderColor: "gray", borderRadius: 10, borderWidth: 1, display: "flex" }
export default function PostHandler({name,subtitle,time,image}) {
    return (
      <>
        <div style={style}>
          <div style={{ display: "flex" }}>
            <img src="https://plus.unsplash.com/premium_photo-1683865775849-b958669dca26?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wxfHx8ZW58MHx8fHx8" alt="" style={{
              width: 30,
              height: 30,
              borderRadius: 20
            }} />
          </div>
          <div style={{ fontSize: 10, marginLeft: 10 }}>
            <b >{name}</b>
            <div>{subtitle}</div>
            {(time!==undefined)?<div style={{display:"flex"}}>
                <div>{time}</div>
                <img src="https://plus.unsplash.com/premium_photo-1683865775849-b958669dca26?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wxfHx8ZW58MHx8fHx8" alt="" style={{
              width: 30,
              height: 30,
              borderRadius: 20
            }} />
            </div>:null
                
                }

            <div style={{fontSize:12}}>{desc}</div>
          </div>
        </div>
      </>
  
    )
  }