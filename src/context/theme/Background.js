import React from 'react';

const Background = ( { children } ) =>
{
    return (
        <div className="bg-indigo-200 dark:bg-gray-900 transition-all">
            {children}
        </div>
    )
}

export default Background;