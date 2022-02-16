const CircleHomePage = ({id, href, children}) => {
    return(
        <div id={id} className='route'>
            <a href={href}>{children}</a>
        </div>
    )
}
export default CircleHomePage