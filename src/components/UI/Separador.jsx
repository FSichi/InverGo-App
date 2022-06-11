
export const Separador = ({text}) => {
    return (
        <div className="relative flex mt-2 items-center">
            <div className="flex-grow border-t border-teal-300 dark:border-indigo-400"></div>
            <span className="flex-shrink mx-4 text-teal-400 dark:text-indigo-400">{text}</span>
            <div className="flex-grow border-t border-indigo-300 dark:border-indigo-400"></div>
        </div>
    )
}