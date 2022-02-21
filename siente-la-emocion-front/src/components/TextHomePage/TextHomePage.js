import './textHomePage.css'
const TextHomePage = ({title, p1, p2}) => {
    return(
        <div className='textHomePag'>
            <h2>{title}</h2>
            <p>
              {p1}
            </p>
            <p>
                {p2}
            </p>
        </div>
    )

}
export default TextHomePage