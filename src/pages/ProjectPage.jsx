import React from "react";
import { useRouteMatch } from "react-router";
import { useQuery, useMutation } from "@apollo/client";
import { DragDropContext } from "react-beautiful-dnd";
import Base from "./Base";
import ProjectOperations from "../components/ProjectOperations";
import TaskList from "../components/TaskList";
import { PROJECT } from "../queries";
import { MOVE_TASK } from "../mutations";

const ProjectPage = () => {

  const projectId = useRouteMatch("/projects/:id").params.id;

  const { loading, data } = useQuery(PROJECT, {
    variables: { id: projectId}
  });

  const [moveTask,] = useMutation(MOVE_TASK);

  if (loading) return <Base className="project-page" loading={true} />

  const project = data.project;

  const onDragEnd = result => {
    const taskId = data.project.tasks[result.source.index].id;
    const index = result.destination.index;

    moveTask({
      variables: {id: taskId, index},
      optimisticResponse: {
        __typename: "Mutation",
      },
      update: (proxy) => {
        const newData = JSON.parse(JSON.stringify(proxy.readQuery({ query: PROJECT, variables: { id: projectId}})));        

        for (let task of newData.project.tasks) {
          if (task.id === taskId) {
            newData.project.tasks = newData.project.tasks.filter(task => task.id !== taskId);
            newData.project.tasks.splice(index, 0, task);
            break;
          }

        }
        proxy.writeQuery({ query: PROJECT, variables: { id: projectId}, data: newData});
      }
    });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Base className="project-page">
        <h1>{project.name}</h1>
        <p>{project.description}</p>

        <TaskList tasks={project.tasks} project={project} />
        <ProjectOperations project={project} />

      </Base>
    </DragDropContext>
  );
};

ProjectPage.propTypes = {
  
};

export default ProjectPage;