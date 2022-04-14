// ## Style ##
import './buttonForm.css'

const ButtonForm =({children}) => {
    return (
        <div className='buttonForm'>
            <button type='submit'>{children}</button>
        </div>
    )
}
export default ButtonForm