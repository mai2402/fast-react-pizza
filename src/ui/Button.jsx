import {Link} from 'react-router-dom';

function Button({children, disabled, to, type, onClick}) {
    const base = " text-sm bg-yellow-400 rounded-full text-stone-800 inline-block tracking-wide fo" +
            "nt-semibold  uppercase hover:bg-yellow-300 transition-colors duration-300 focus:" +
            "outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:bg-yello" +
            "w-300 disabled:cursor-not-allowed ";
    const styles = {
        primary: base + 'px-4 py-3 md:px-6 md:py-4',
        small: base + 'md:px-5 md:py-2.5 py-2 px-4 text-xs',
        round: base + 'md:px-3.5 md:py-2 py-1 px-2.5 text-sm m-2',
        secondary: 'inline-block rounded-full border-2 border-stone-300 font-semibold uppercase trac' +
                'king-wide text-stone-800 transition-colors duration-300 hover:bg-stone-200 focus' +
                ':bg-stone-200 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offs' +
                'et-2 disabled:cursor-not-allowed px-2 py-2.5 md:px-6 md:py-3.5 hover:text-stone-' +
                '800'
    }

    if (to) 
        return <Link to={to} className={styles[type]}>
            {children}</Link>
    if (onClick) 
        return (
            <button to={to} onClick={onClick} disabled={disabled} className={styles[type]}>
                {children}

            </button>
        )

    return (
        <button to={to} disabled={disabled} className={styles[type]}>
            {children}

        </button>
    )
}

export default Button
