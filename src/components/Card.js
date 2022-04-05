import React from 'react'

const Card = ({id, image, name, type, HP , _callback}) => {
    const style = type + " thumb-container";
    return (
        <div className={style}>
            <div className="number"><small>#{id}</small></div>
            <img src={image} alt={name}/>
            <div className="detail-wrapper">
                <h3>{name}</h3>
                <small>HP: {HP}</small>
            </div>
        </div>
    )
}

export default Card
