import React, { FunctionComponent } from 'react'

import { Project as ProjectType } from '@/types/cms'
import Project from './project'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type ProjectListProps = {
    posts: ProjectType[]
}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const ProjectList: FunctionComponent<ProjectListProps> = ({ posts }) => {

    return (
        <ul className={`list-reset`}>
            {posts.map(post => (
                <li key={`project-item-${post.id}`}>
                    <Project {...post} />
                </li>
            ))}
        </ul>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default ProjectList