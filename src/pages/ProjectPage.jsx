import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { useMutation, useQuery } from "@apollo/client";
import { DragDropContext } from "react-beautiful-dnd";
import { cloneDeep } from "lodash";
import classNames from "classnames";
import ProjectForm from "../components/ProjectForm";
import { PROJECT, PROJECTS } from "../queries";
import { DELETE_PROJECT, MOVE_OPERATION_WITHIN_PROJECT } from "../mutations";
import Base from "./Base";
import trash from "../images/trash.svg";
import pencil from "../images/pencil.svg";
import Modal from "../components/Modal";
import Button from "../components/Button";
import DropdownList from "../components/DropdownList";
import OperationsList from "../components/OperationsList";
import { PROJECT_STATUSES } from "../utils";
import moment from "moment";
import NewOperation from "../components/NewOperation";

const ProjectPage = () => {

  const projectId = useRouteMatch("/projects/:id").params.id;
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeletionModal, setShowDeletionModal] = useState(false);
  const { loading, data } = useQuery(PROJECT, {variables: {id: projectId}});
  const history = useHistory();
  
  useEffect(() => {
    document.title = data ? `stratako - ${project.name}` : "stratako";
  });

  const [deleteProject, deleteProjectMutation] = useMutation(DELETE_PROJECT, {
    onCompleted: () => history.push("/projects/"),
    refetchQueries: [{query: PROJECTS}],
    awaitRefetchQueries: true
  })

  const [moveOperationWithinProject,] = useMutation(MOVE_OPERATION_WITHIN_PROJECT, {
    optimisticResponse: {__typename: "Mutation"},
  });

  if (loading) return <Base loading={true} />

  const project = data.user.project;

  const futureOperations = project.operations.filter(p => p.started === null);

  const status = PROJECT_STATUSES[project.status]
  
  const statusClass = classNames({
    status: true, [status.toLowerCase().replace(" ", "-")]: true
  })

  const deleteSubmit = e => {
    e.preventDefault();
    deleteProject({variables: {id: project.id}})
  }

  const changes = project.statusChanges.map((change, i) => [
    moment(change.timestamp * 1000).format("D MMMM, YYYY"),
    moment(change.timestamp * 1000).format(),
    PROJECT_STATUSES[change.original],
    PROJECT_STATUSES[i === project.statusChanges.length - 1 ? project.status : project.statusChanges[i + 1].original],
  ])

  const onDragEnd = e => {
    if (e.destination) {
      moveOperationWithinProject({
        variables: {
          id: e.draggableId, index: e.destination.index - 1,
          project: e.destination.droppableId
        },
        update: (proxy) => {
          const newData = cloneDeep(proxy.readQuery({ query: PROJECT, variables: {id: project.id}}));
          const operation = newData.user.project.operations.filter(o => o.id === e.draggableId)[0];
          const zeroOrderOpCount = newData.user.project.operations.filter(o => o.projectOrder === 0).length;
          newData.user.project.operations = newData.user.project.operations.filter(o => o.id !== e.draggableId);
          newData.user.project.operations.splice(e.destination.index - 1 + zeroOrderOpCount, 0, operation);
          let index = 1;
          for (let op of newData.user.project.operations.filter(o => o.started === null)) {
            op.projectOrder = index;
            index += 1;
          }
          proxy.writeQuery({ query: PROJECT, variables: {id: project.id}, data: newData });
        },
      })
    }
  }

  return (
    <Base className="project-page">
      <div className="top-row">
        <h1><span className="color" style={{backgroundColor: project.color}}/>
          {project.name}
          <DropdownList>
            <div onClick={() => setShowFormModal(true)}>
              <img src={pencil} alt="edit" />Edit
            </div>
            <div onClick={() => setShowDeletionModal(true)}>
              <img src={trash} alt="delete" />Delete
            </div>
          </DropdownList>
        </h1>
        <div className={statusClass}>{status}</div>
      </div>

      
      
      <ProjectForm
        project={project} projectCategories={data.user.projectCategories}
        showFormModal={showFormModal} setShowFormModal={setShowFormModal}
      />
      <Modal showModal={showDeletionModal} setShowModal={setShowDeletionModal}>
        <form onSubmit={deleteSubmit}>
          <div className="modal-heading">Delete Project <span className="instance">{project.name}</span>?</div>
          <p className="modal-text">This cannot be undone.</p>
          <Button className="delete-button" loading={deleteProjectMutation.loading}>Delete</Button>
        </form>
      </Modal>

      <div className="second-row">
        <p className="description">{project.description}</p>
        <div className="project-history">
          <div className="event">Started <time title={moment(project.created * 1000).format()}>{moment(project.created * 1000).format("D MMMM, YYYY")}</time></div>
          {changes.map((change, i) => (
            <div className="event" key={i}>
              Changed from <span className="status">{change[2]}</span> to <span className="status">{change[3]}</span> on <time title={change[1]}> {change[0]}</time></div>
          ))}
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <OperationsList operations={futureOperations} droppableId={project.id} /> 
      </DragDropContext>
      <NewOperation project={project} />
      
    </Base>
  );
};

ProjectPage.propTypes = {
  
};

export default ProjectPage;